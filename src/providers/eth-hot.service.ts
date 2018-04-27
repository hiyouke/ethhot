import { Injectable } from "@angular/core";

import Web3 from 'web3';
import { Contract } from 'web3/types';

import { Subject, Observable } from 'rxjs';

//测试
//const WEB3_HTTP_PROVIDER: string = "https://ropsten.infura.io/";
//const WEB3_WEBSOCKET_PROVIDER: string = "wss://ropsten.infura.io/ws";

//正式
const WEB3_HTTP_PROVIDER: string = "https://mainnet.infura.io/";
const WEB3_WEBSOCKET_PROVIDER: string = "wss://mainnet.infura.io/ws";

@Injectable()
export class EthHotService {

    myWeb3: Web3;

    hotContract: Contract = null;

    coinbase: string;

    records: Array<any>;

    recordChange: Subject<any> = new Subject<any>();

    contractAddress: string;

    contractAbi: any;

    isOwner: boolean;

    constructor() {
        this.contractAddress = "0xC3417151cC98f07B8e733fB8FaAf2E7e09c5142e";

        this.contractAbi = [{ "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "records", "outputs": [{ "name": "index", "type": "uint256" }, { "name": "bid", "type": "uint256" }, { "name": "name", "type": "string" }, { "name": "link", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_id", "type": "uint256" }, { "name": "_name", "type": "string" }], "name": "updateRecordName", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_name", "type": "string" }, { "name": "_link", "type": "string" }], "name": "createRecord", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [], "name": "getRecordCount", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_index", "type": "uint256" }], "name": "supportRecord", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "bid", "type": "uint256" }, { "indexed": false, "name": "name", "type": "string" }, { "indexed": false, "name": "link", "type": "string" }], "name": "CreateEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "bid", "type": "uint256" }], "name": "SupportEvent", "type": "event" }];

        this.InitWeb3();
    }

    //给微信用户(Observable)关注提供的方法  
    public get recordLengthChange(): Observable<any> {
        return this.recordChange.asObservable();
    }

    InitWeb3() {
        const wa = window as any;
        if (window.hasOwnProperty('web3')) {
            wa.web3 = new Web3(wa.web3.currentProvider);
        } else {
            wa.web3 = new Web3(new Web3.providers.HttpProvider(WEB3_HTTP_PROVIDER));
        }

        this.myWeb3 = wa.web3;

        //console.log("web3 api version : " + this.myWeb3.version);

        this.InitAccount();

        this.InitContract();

        this.InitContractEvent();
    }

    InitAccount() {
        this.myWeb3.eth.getAccounts((err, accounts) => {
            if (err != null) {
                console.log("发生错误：" + err);
            }
            else if (accounts.length == 0) {
                //console.log("没有帐号");
            }
            else {
                this.coinbase = accounts[0];

                this.hotContract.methods.owner().call().then(ret => {
                    this.isOwner = this.coinbase == ret;
                }).catch(err => {
                    console.log(err);
                });
            }
        });
    }

    InitContract() {
        this.hotContract = new this.myWeb3.eth.Contract(this.contractAbi, this.contractAddress);
    }

    InitContractEvent() {
        var web3Infura = new Web3(new Web3.providers.WebsocketProvider(WEB3_WEBSOCKET_PROVIDER));
        new web3Infura.eth.Contract(this.contractAbi, this.contractAddress).events.allEvents({}, (err, result) => {
            console.log("allEvents  err : " + err + " result: " + result);
            if (err == null) {
                this.GetRecordCount();
            }
            else {
                alert("不支持事件 err : " + err);
            };
        })
    }

    GetRecordCount() {
        if (null != this.hotContract) {
            this.records = new Array();

            this.hotContract.methods.getRecordCount().call().then(count => {
                this.GetRecords(count);
            }).catch(err => console.log(err));
        }
    }

    GetRecords(count: any) {
        for (var i = 0; i < count; i++) {
            this.hotContract.methods.records(i).call().then(record => {
                this.AddRecordsAndSorted(record);
            }).catch(err => console.log(err));
        }
    }

    AddRecordsAndSorted(record: any) {
        record[1] = parseFloat(this.myWeb3.utils.fromWei(this.myWeb3.utils.toBN(record[1]), "ether")).toFixed(3);

        this.records.push(record);

        this.records.sort((l, r) => {
            if (l[1] > r[1]) return -1;
            if (l[1] < r[1]) return 1;
            return 0;
        });

        this.recordChange.next(this.records.length);
    }

    SupportRecord(record: any[]) {
        return this.hotContract.methods.supportRecord(record[0]).send({ from: this.coinbase, value: this.myWeb3.utils.toWei("0.001", "ether") });
    }

    CreateRecord(name: string, link: string, price: string) {
        return this.hotContract.methods.createRecord(name, link).send({ from: this.coinbase, value: this.myWeb3.utils.toWei(price, "ether") });
    }

    Withdraw() {
        return this.hotContract.methods.withdraw().send({ from: this.coinbase });
    }
}