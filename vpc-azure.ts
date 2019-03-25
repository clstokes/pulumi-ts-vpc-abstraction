import * as azure from "@pulumi/azure";
import * as pulumi from "@pulumi/pulumi";
import { Vpc, VpcArgs } from "./vpc";

export class MyVpc extends pulumi.ComponentResource implements Vpc {
    public readonly vpcId: pulumi.Output<string>;
    public readonly subnetIds: pulumi.Output<string>[];

    constructor(args: AzureVpcArgs) {
        super("custom:gcp:Vpc", args.name, {});

        const resourceGroup = new azure.core.ResourceGroup(args.name, {
            name: args.name,
            location: args.location,
        });

        const vpc = new azure.network.VirtualNetwork(args.name, {
            resourceGroupName: resourceGroup.name,
            location: args.location,
            addressSpaces: [args.cidrBlock],
            name: args.name,
        }, { parent: this });

        const subnetIds = args.subnetCidrBlocks.map((cidrBlock, i) => {
            const subnetName = `${args.name}-${i}`;
            const subnet = new azure.network.Subnet(subnetName, {
                resourceGroupName: resourceGroup.name,
                virtualNetworkName: vpc.name,
                name: subnetName,
                addressPrefix: cidrBlock,
            });
            return subnet.name;
        }, { parent: this });

        this.vpcId = vpc.name;
        this.subnetIds = subnetIds;

        this.registerOutputs({
            vpcId: vpc.id,
            subnetIds: subnetIds,
        })
    }
}

export class AzureVpcArgs extends VpcArgs {
    public location: string;
}
