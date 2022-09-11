export NEAR_CONTRACT_NAME=near_staking_saver
export NEAR_ACCOUNT_ID=<your_near_account_name>
near deploy --wasmFile target/wasm32-unknown-unknown/release/$(echo $NEAR_CONTRACT_NAME).wasm --accountId $(echo $NEAR_ACCOUNT_ID)