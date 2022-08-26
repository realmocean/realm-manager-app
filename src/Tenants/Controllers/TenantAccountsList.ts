import {
    cLeading,
    cTopLeading,
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
import { ActionButton } from '../../Views/ActionButton';
import { ITableViewColumn, Views } from '../../Views/Views';
import { TenantsGrid } from '../Views/TenantsGrid';
import { Icon } from '@tuval/forms';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif'

const columns: ITableViewColumn[] = [
    {
        title: 'Account Name',
        key: "account_name"
    },
    {
        title: 'Email',
        key: "account_email"
    },
    {
        title: 'Type',
        view: (row) => (
            HStack(
                Text(row.is_tenant_admin ? 'Tenant Admin' : 'User')
            )
                .width(100).maxWidth('100px').minWidth('100px').height(30)
                .background(row.is_tenant_admin ? '#15CD72' : '#2196f3').lineHeight('10px').fontSize(13).fontWeight('500')
                .foregroundColor('white').padding('8px 10px').cornerRadius(7)
                .transition('box-shadow .28s cubic-bezier(.4,0,.2,1)')

        )
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


    public BindRouterParams({ tenant_id, tenant_name }) {
        this.tenantId = tenant_id;
        this.tenantName = tenant_name;

        if (tenant_id) {
            //  if (this.tenants == null) {
            RealmBrokerClient.GetTenantAccounts(tenant_id).then(accounts => {
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
                        this.tenantAccounts == null ?
                            VStack(Spinner()) :
                            VStack({ alignment: cTopLeading, spacing: 10 })(
                                HStack({ alignment: cLeading, spacing: 15 })(
                                    Icon('\\d37d').size(30).onClick(()=> this.navigotor(-1)),
                                    Text(`${this.tenantName} - Accounts`)
                                        .foregroundColor('#444')
                                        .fontFamily(fontFamily).fontSize('2.4rem').fontWeight('300'),
                                    Spacer(),
                                    UIRouteLink(`/app(realmmanager)/tenant/${this.tenantId}/add/account`, { tenant_name: this.tenantName })(
                                        ActionButton('New Account')
                                    )
                                ).height().marginBottom('24px'),
                                // MARK: Search Box
                                HStack(
                                    TextField().placeholder('Search by Account Name')
                                        .onTextChange((value) => this.Search_Action(value))
                                ).border('solid 1px #dfdfdf').padding(10).height().cornerRadius(5),
                                Views.TableView(columns, this.tenantAccounts)
                            ).padding(20)
                    )
                )

            )
    }

}