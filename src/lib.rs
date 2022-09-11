use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{near_bindgen, env, AccountId, EpochHeight, PanicOnDefault, collections::{Vector}};
use std::clone::Clone;
use std::convert::{TryInto};
use chrono;

type StakeAmount = i64;

#[near_bindgen]
impl SaladNearStakingSaver {
    #[init]
    pub fn new() -> Self {
        Self {
            stakings: Vector::new(b"t"),
            staking_parts: Vector::new(b"t"),
        }
    }

    pub fn get_staking_records_for_account(&self, account_id: AccountId) -> Vec<(AccountId, String, u64, String)> {
        let records = self.stakings.iter().filter(|x| x.account_id == account_id);

        records.map(|x| (x.account_id, x.status, x.epoch, x.timestamp)).collect::<Vec<_>>()
    }

    pub fn get_staking_records_for_tx(&self, tx_id: String) -> Vec<(AccountId, StakeAmount)> {
        let records = self.staking_parts.iter().filter(|x| x.tx_id == tx_id);

        records.map(|x| (x.validator_id, x.amount)).collect::<Vec<_>>()
    }

    pub fn update_staking_record_status(&mut self, tx_id: String, new_status: String) -> bool {
        let record = self.stakings.iter().find(|x| x.tx_id == tx_id);

        if let Some(_x) = record {
            let index = self.stakings.iter().position(|x| x.tx_id == tx_id).unwrap();
            self.stakings.get(index.try_into().unwrap()).unwrap().status = new_status;

            return true;
        }

        false
    }

    pub fn add_staking_record(&mut self, account_id: AccountId, tx_id: String, amounts: Vec<StakeAmount>, validators: Vec<String>) -> bool {
        self.stakings.push(&StakingRecord {
            tx_id: tx_id.clone(),
            timestamp: chrono::offset::Local::now().format("DD-MM-YYYY hh:mm").to_string(),
            account_id: account_id,
            status: "Active".to_string(),
            epoch: env::epoch_height()
        });

        for i in &validators {
            let validator_id: AccountId = i.to_string().try_into().unwrap();

            self.staking_parts.push(&StakingRecordPart {
                validator_id: validator_id,
                amount: amounts[validators.clone().iter().position(|x| x == i).unwrap()],
                tx_id: tx_id.clone()
            });
        }

        true
    }
}

enum StakingRecordStatus {
    Active,
    Closed
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
struct StakingRecordPart {
    tx_id: String,
    validator_id: AccountId,
    amount: StakeAmount
}

#[derive(BorshSerialize, BorshDeserialize, Clone)]
struct StakingRecord {
    tx_id: String,
    account_id: AccountId,
    timestamp: String,
    status: String,
    epoch: EpochHeight
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct SaladNearStakingSaver {
    stakings: Vector<StakingRecord>,
    staking_parts: Vector<StakingRecordPart>
}
