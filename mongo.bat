@echo off
chcp 65001
"mongoimport.exe" --uri="mongodb://localhost:27017/mobilTelefonBolt" --collection=mobilGyartok --drop --file=mobilGyartok.json --jsonArray
"mongoimport.exe" --uri="mongodb://localhost:27017/mobilTelefonBolt" --collection=telefonok --drop --file=telefonok.json --jsonArray
echo PLEASE KILL AND RESTART YOUR BACKEND SERVER DEV TASK IF RUNNING!