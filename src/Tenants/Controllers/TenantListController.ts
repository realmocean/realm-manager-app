import {
    cHorizontal,
    cLeading,
    cTopLeading,
    cTrailing,
    HStack,
    Icon,
    IconLibrary,
    Spacer,
    Spinner,
    State,
    Text,
    TextField,
    UIButton,
    UIController,
    UIScene,
    VStack,
} from '@tuval/forms';

import { UIButtonView } from '@realmocean/buttons'

import { RealmBrokerClient, IGetTenantsResponce } from '../../Services/RealmBrokerClient';
import { TenantsGrid } from '../Views/TenantsGrid';
import { Color, UIRouteLink } from '@tuval/forms';
import { AddTenantController } from './AddTenantController';
import { Services } from '../../Services/Services';
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';
import { ITableViewColumn, Views } from '../../Views/Views';
import { ITenant, useOrgProvider } from '@realmocean/common';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif'

const columns: ITableViewColumn[] = [
    {
        title: 'Tenant Name',
        key: "Name"
    },
    {
        title: 'Account Count',
        titleAlignment: 'middle',
        view: (tenant: any) => (
            HStack(
                Text(tenant.AccountCount)
            )
        )
    },
    {
        title: 'Created At',
        key: "CreatedAt"
    },
    {
        title: 'Updated At',
        key: "UpdatedAt"
    },
    {
        title: '',
        view: (tenant: any) => (
            HStack(
                Views.ActionContextMenu([
                    {
                        title: 'Accounts',
                        icon: IconLibrary.AccountCircle as any,
                        tooltip: 'Edit',
                        iconColor: '#505A64',
                        link: `/app(realmmanager)/tenant/${tenant.Id}/accounts`,
                        linkState: { position: tenant }
                    },
                    {
                        title: 'Edit',
                        icon: '\\d202',
                        tooltip: 'Edit',
                        iconColor: '#505A64',
                        link: `/app(realmmanager)/tenant/${tenant.Id}/edit`,
                        linkState: { position: tenant }
                    },
                    {
                        title: 'Delete',
                        icon: '\\d390',
                        tooltip: 'Delete',
                        iconColor: Color.red400 as any,
                        link: `/app(realmmanager)/tenant/${tenant.Id}/delete`,
                        linkState: { position: tenant }
                    }
                ])
            )
        )
    }
]

export class TenantListController extends UIController {

    @State()
    private tenants: ITenant[];

    @State()
    private showingTenants: ITenant[];

    @State()
    private texts: string;

    public Invalidate() {
        this.tenants = null;
    }

    private isLoading() {
        return this.tenants == null;
    }

    public BindRouterParams() {
        this.tenants = null;

        const orgService = useOrgProvider();

        //  if (this.tenants == null) {
        orgService.getTenants().then(tenants => {
            this.showingTenants = this.tenants = tenants;
        })
        //  }
    }

    public BindModel() {

    }

    private Search_Action(value: string): void {
        this.showingTenants = this.tenants.filter((tenant: ITenant) => tenant.Name.toLowerCase().indexOf(value.toLowerCase()) > -1);
    }

    public LoadView(): any {
        return ({ AppController_ContextAction_SetController }) => {
            return (
                UIScene(
                    HStack({ alignment: cTopLeading })(
                        LeftSideMenuView('', 'Tenants'),
                        Views.RightSidePage({
                            title: 'Tenants',
                            content: (
                                HStack({ alignment: cTopLeading })(
                                    this.isLoading() ?
                                        VStack(Spinner()) :
                                        VStack({ alignment: cTopLeading, spacing: 10 })(
                                            HStack({ spacing: 10 })(
                                                // MARK: Search Box
                                                Views.SearchBox('Search by tenant name', this.Search_Action.bind(this)),


                                                Spacer(),
                                                UIRouteLink('/app(realmmanager)/tenant/add')(
                                                    UIButtonView().text('New Tenant')
                                                )
                                            ).height().marginBottom('24px').padding(20),
                                            Views.TableView(columns, this.showingTenants)
                                        )
                                )
                            )
                        })
                    )



                )

            )
        }
    }

}