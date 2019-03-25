import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { Vpc, VpcArgs } from "./vpc";

export class MyVpc extends pulumi.ComponentResource implements Vpc {
    public readonly vpcId: pulumi.Output<string>;
    public readonly subnetIds: pulumi.Output<string>[];

    constructor(args: VpcArgs) {
        super("custom:aws:Vpc", args.name, {});

        const vpc = new aws.ec2.Vpc(args.name, {
            cidrBlock: args.cidrBlock,
            tags: { "Name": args.name, },
        }, { parent: this });

        const subnetIds = args.subnetCidrBlocks.map((cidrBlock, i) => {
            const subnetName = `${args.name}-${i}`;
            const subnet = new aws.ec2.Subnet(subnetName, {
                vpcId: vpc.id,
                cidrBlock: cidrBlock,
                tags: { "Name": subnetName, },
            });
            return subnet.id;
        }, { parent: this });

        this.vpcId = vpc.id;
        this.subnetIds = subnetIds;

        this.registerOutputs({
            vpcId: vpc.id,
            subnetIds: subnetIds,
        })
    }
}
