import {MyVpc} from "./vpc-aws";
// import {MyVpc} from "./vpc-azure";
// import {MyVpc} from "./vpc-gcp";

const vpc = new MyVpc({
    name: "main",
    cidrBlock: "10.0.0.0/16",
    subnetCidrBlocks: ["10.0.10.0/24","10.0.20.0/24"],

    // location: "eastus", // Azure only - comment this line for other providers.
});

export const vpcId = vpc.vpcId;
export const subnetIds = vpc.subnetIds;

