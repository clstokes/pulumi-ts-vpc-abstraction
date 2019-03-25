import * as pulumi from "@pulumi/pulumi";

export interface Vpc {
    vpcId: pulumi.Output<string>;
    subnetIds: pulumi.Output<string>[];
}

export class VpcArgs {
    public name: string;
    public cidrBlock: string;
    public subnetCidrBlocks: string[];
}
