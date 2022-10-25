import {
    cLeading,
    Color,
    cTopLeading,
    getRouterParams,
    HStack,
    Spacer,
    Spinner,
    State,
    Text,
    TextField,
    UIController,
    UIRouteLink,
    UIScene,
    VStack,
} from '@tuval/forms';

import { RealmBrokerClient } from '../../Services/RealmBrokerClient';

import { ITableViewColumn, Views } from '../../Views/Views';
import { TenantsGrid } from '../Views/TenantsGrid';
import { Icon } from '@tuval/forms';
import { ActionButton } from '../../Views/ActionButton';
import { IAccount, useOrgProvider } from '@realmocean/common'
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';
import { UIButtonView } from '@realmocean/buttons';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif'

const columns: ITableViewColumn[] = [
    {
        title: 'Account Name',
        key: "Name"
    },
    {
        title: 'First Name',
        key: "FirstName"
    },
    {
        title: 'LastName',
        key: "LastName"
    },
    {
        title: 'Email',
        key: "Email"
    },
    {
        title: 'Type',
        view: (account: IAccount) => {
            const { tenant_id } = getRouterParams();
            return (
                HStack({ alignment: cLeading })(
                    account.IsTenantAdmin ? Text('Organization Admin') : Text('Member')
                )
            )
        }
    },
    {
        title: '',
        view: (account: IAccount) => {
            const { tenant_id } = getRouterParams();
            return (
                HStack({ alignment: cLeading })(
                    Views.ActionContextMenu([
                        {
                            title: 'Edit',
                            icon: '\\d202',
                            tooltip: 'Edit',
                            iconColor: '#505A64',
                            link: `/app(realmmanager)/tenant/${tenant_id}/edit/account/${account.Id}`,
                            linkState: { position: account }
                        },
                        {
                            title: 'Delete',
                            icon: '\\d390',
                            tooltip: 'Delete',
                            iconColor: Color.red400 as any,
                            link: `/app(tenantmanager)/employee/delete/${account.Id}`,
                            linkState: { position: account }
                        }
                    ])
                )
            )
        }
    }
]

export class TenantAccountsList extends UIController {

    @State()
    private tenantId: string;

    @State()
    private tenantName: string;

    @State()
    private tenantAccounts: any[];

    @State()
    private showingTenantAccounts: any[];

    @State()
    private texts: string;


    public BindRouterParams({ tenant_id }) {
        this.tenantId = tenant_id;

        const orgServioce = useOrgProvider();
        if (tenant_id) {
            orgServioce.getTenantById(tenant_id).then(tenant => this.tenantName = tenant.Name)
            //  if (this.tenants == null) {
            orgServioce.getAccountsByTenantId(tenant_id).then(accounts => {
                this.showingTenantAccounts = this.tenantAccounts = accounts;
            })
        }

        //  }
    }

    public BindModel() {

    }

    private Search_Action(value: string): void {
        //this.showingTenants = this.tenants.filter((tenant) => tenant.tenant_name.toLowerCase().indexOf(value.toLowerCase()) > -1);
    }


    public LoadView(): any {
        return (
            UIScene(
                HStack({ alignment: cTopLeading })(
                    LeftSideMenuView('', 'Tenants'),
                    Views.RightSidePage({
                        title: `${this.tenantName} - Accounts`,
                        content: (
                            HStack({ alignment: cTopLeading })(
                                this.tenantAccounts == null ?
                                    VStack(Spinner()) :
                                    VStack({ alignment: cTopLeading, spacing: 10 })(
                                        // MARK: Search Box
                                        HStack(
                                            // MARK: Search Box
                                            HStack(
                                                TextField().placeholder('Search by Tenant Name')
                                                    .onTextChange((value) => this.Search_Action(value))
                                            ).border('solid 1px #dfdfdf').padding(10).width(300).cornerRadius(5),
                                            Spacer(),
                                            UIRouteLink(`/app(realmmanager)/tenant/${this.tenantId}/add/account`)(
                                                UIButtonView().text('New Account')
                                            )
                                        ).height().marginBottom('24px'),
                                        Views.TableView(columns, this.tenantAccounts)
                                    ).padding(20)

                            ).background(Color.white)
                        )
                    })
                )
            )

        )
    }

}