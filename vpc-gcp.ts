import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import { Vpc, VpcArgs } from "./vpc";

export class MyVpc extends pulumi.ComponentResource implements Vpc {
    public readonly vpcId: pulumi.Output<string>;
    public readonly subnetIds: pulumi.Output<string>[];

    constructor(args: VpcArgs) {
        super("custom:gcp:Vpc", args.name, {});

        const vpc = new gcp.compute.Network(args.name, {
            name: args.name,
            autoCreateSubnetworks: false,
        }, { parent: this });

        const subnetIds = args.subnetCidrBlocks.map((cidrBlock, i) => {
            const subnetName = `${args.name}-${i}`;
            const subnet = new gcp.compute.Subnetwork(subnetName, {
                name: subnetName,
                network: vpc.selfLink,
                ipCidrRange: cidrBlock,
            });
            return subnet.selfLink;
        }, { parent: this });

        this.vpcId = vpc.selfLink;
        this.subnetIds = subnetIds;

        this.registerOutputs({
            vpcId: vpc.id,
            subnetIds: subnetIds,
        })
    }
}
