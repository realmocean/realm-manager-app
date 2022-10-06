import {
    cLeading,
    cTopLeading,
    HStack,
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

import { RealmBrokerClient, IGetTenantsResponce } from '../../Services/RealmBrokerClient';
import { TenantsGrid } from '../Views/TenantsGrid';
import { Color, UIRouteLink } from '@tuval/forms';
import { AddEditTenantController } from './AddEditTenantController';
import { Services } from '../../Services/Services';
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';
import { Views } from '../../Views/Views';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif'

export class TenantListController extends UIController {

    @State()
    private tenants: IGetTenantsResponce;

    @State()
    private showingTenants: IGetTenantsResponce;

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
        //  if (this.tenants == null) {
        RealmBrokerClient.GetTenants().then(tenants => {
            this.showingTenants = this.tenants = tenants;
        })

        //  }
    }

    public BindModel() {

    }

    private Search_Action(value: string): void {
        this.showingTenants = this.tenants.filter((tenant) => tenant.tenant_name.toLowerCase().indexOf(value.toLowerCase()) > -1);
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
                                            HStack(
                                                // MARK: Search Box
                                                HStack(
                                                    TextField().placeholder('Search by Tenant Name')
                                                        .onTextChange((value) => this.Search_Action(value))
                                                ).border('solid 1px #dfdfdf').padding(10).width(300).cornerRadius(5),
                                                Spacer(),
                                                UIRouteLink('/app(realmmanager)/tenant/add')(
                                                    Text('New Tenant')
                                                )
                                            ).height().marginBottom('24px'),
                                            TenantsGrid(this.showingTenants)
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