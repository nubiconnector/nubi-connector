use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, env, AccountId, EpochHeight, Timestamp, collections::{Vector}, PanicOnDefault, Promise};
use near_sdk::{json_types::U128};
use std::clone::Clone;

// enum Status {
   // Active,
   // Withdrawed
   // Suspened ??
// }

#[derive(BorshSerialize, BorshDeserialize, Clone)]
struct StakingRecordPart {
    tx_id: String,
    validator_id: AccountId,
    amount: i64
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
struct StakingRecordOrigin {
    status: String,
    account_id: AccountId,
    tx_id: String,
    tx_epoch: EpochHeight,
    tx_timestamp: Timestamp,
    amount: i64
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct SaladNearStakingSaver {
    staking_parts: Vector<StakingRecordPart>,
    staking_records: Vector<StakingRecordOrigin>
}

#[near_bindgen]
impl SaladNearStakingSaver {
    #[init]
    pub fn new() -> Self {
        Self {
            staking_records: Vector::new(b"m"),
            staking_parts: Vector::new(b"m"),
        }
    }

    pub fn get_staking_records_for_account(&self, account_id: AccountId) -> Vec<(AccountId, String, u64, Timestamp, i64)> {
        let records = self.staking_records.iter().filter(|x| x.account_id == account_id);

        records.map(|x| (x.account_id, x.status, x.tx_epoch, x.tx_timestamp, x.amount)).collect::<Vec<_>>()
    }

    pub fn get_staking_records_for_tx(&self, tx_id: String) -> Vec<(AccountId, i64)> {
        let records = self.staking_parts.iter().filter(|x| x.tx_id == tx_id);

        records.map(|x| (x.validator_id, x.amount)).collect::<Vec<_>>()
    }

    pub fn update_staking_record_status(&mut self, tx_id: String, new_status: String) -> bool {
        let record = self.staking_records.iter().find(|x| x.tx_id == tx_id);

        if let Some(_x) = record {
            let index = self.staking_records.iter().position(|x| x.tx_id == tx_id).unwrap();
            let mut item = self.staking_records.get(index as u64).unwrap();
            self.staking_records.swap_remove(index as u64);
            item.status = new_status;
            self.staking_records.push(&item);

            return true;
        }

        false
    }

    pub fn add_staking_record_and_part(&mut self, account_id: AccountId, tx_id: String, amounts: Vec<i64>, validators: Vec<AccountId>, amount: i64) -> bool {
        for i in &validators {
            self.staking_parts.push(&StakingRecordPart {
                validator_id: i.clone(),
                amount: amounts[validators.clone().iter().position(|x| x == i).unwrap()],
                tx_id: tx_id.clone()
            });
        }

        self.add_staking_record(account_id, tx_id, "Active".to_string(), amount)
    }

    pub fn add_staking_record(&mut self, account_id: AccountId, tx_id: String, status: String, amount: i64) -> bool {
        self.staking_records.push(&StakingRecordOrigin {
            status: status,
            account_id: account_id,
            tx_id: tx_id,
            tx_epoch: env::epoch_height(),
            tx_timestamp: env::block_timestamp(),
            amount: amount
        });

        true
    }

    pub fn get_total_staking_amount(&self) -> i64 {
        self.staking_records.iter().map(|x| x.amount).reduce(|a, b| a+b).unwrap_or(0)
    }

    pub fn get_build_version(&self) -> i64 {
        0
    }

    #[private]
    pub fn transfer_batch(&self, amounts: Vec<U128>, accounts: Vec<AccountId>) -> Option<String> {
        // TODO: Validate validators length.
        // TODO: return `tx_hash` to save.
        for i in &accounts {
            Promise::new(i.clone()).transfer(
                amounts[accounts.clone().iter().position(|x| x == i).unwrap()].0
            );
        }

        Some("".to_string())
    }

    #[payable]
    pub fn receive_stakings(&mut self, amounts: Vec<U128>, validators: Vec<AccountId>) -> bool {
        let tx_hash = self.transfer_batch(amounts, validators).unwrap();

        true
    }
}
