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
import { Color, UIRouteLink, UIRouteOutlet } from '@tuval/forms';
import { ActionButton } from '../../Views/ActionButton';
import { AddEditTenantController } from './AddEditTenantController';
import { Services } from '../../Services/Services';
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif'

export class TenantsController extends UIController {

    @State()
    private tenants: IGetTenantsResponce;

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
            this.tenants = tenants;
        })

        //  }
    }

    public BindModel() {

    }


    public LoadView(): any {
        return ({ AppController_ContextAction_SetController }) => {
            return (
                UIScene(
                    HStack({ alignment: cTopLeading })(
                        LeftSideMenuView('', 'Tenants'),
                        UIRouteOutlet().width('100%').height('100%')
                    )
                )

            )
        }
    }
}