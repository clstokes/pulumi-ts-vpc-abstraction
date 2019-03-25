# ts-vpc-abstraction

Example of a minimal VPC abstraction across AWS, Azure, and GCP.

## Getting Started

1. Open a terminal, `git clone` this repo, and change directory to where `index.ts` resides.
1. Change the import at the top of `index.ts` to change cloud provider.

    ```
    import {MyVpc} from "./vpc-aws";
    // import {MyVpc} from "./vpc-azure";
    // import {MyVpc} from "./vpc-gcp";
    ```

1. Run `pulumi up`.

    ```
    $ pulumi up
    Previewing update (dev):

        Type                 Name                    Plan
    +   pulumi:pulumi:Stack  ts-vpc-abstraction-dev  create
    +   ├─ custom:aws:Vpc    main                    create
    +   │  └─ aws:ec2:Vpc    main                    create
    +   ├─ aws:ec2:Subnet    main-1                  create
    +   └─ aws:ec2:Subnet    main-0                  create

    Resources:
        + 5 to create

    Do you want to perform this update? yes
    Updating (dev):

        Type                 Name                    Status
    +   pulumi:pulumi:Stack  ts-vpc-abstraction-dev  created
    +   ├─ custom:aws:Vpc    main                    created
    +   │  └─ aws:ec2:Vpc    main                    created
    +   ├─ aws:ec2:Subnet    main-0                  created
    +   └─ aws:ec2:Subnet    main-1                  created

    Outputs:
        subnetIds: [
            [0]: "subnet-03019da431112da21"
            [1]: "subnet-0e128ddf1cd4889a8"
        ]
        vpcId    : "vpc-0d7d822c4753ed3de"

    Resources:
        + 5 created

    Duration: 14s

    Permalink: https://app.pulumi.com/clstokes/ts-vpc-abstraction/dev/updates/15
    ```

1. Run `pulumi destroy` to clean up resources.

