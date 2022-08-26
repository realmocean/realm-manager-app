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
    cHorizontal,
    Toggle,
    $
} from '@tuval/forms';

import { RealmBrokerClient, IGetTenantByIdResponse } from '../../Services/RealmBrokerClient';
import { TenantsGrid } from '../Views/TenantsGrid';
import { Color, UIImage, UIRouteLink, NavigateFunction, bindNavigate, Binding } from '@tuval/forms';
import { ActionButton } from '../../Views/ActionButton';
import { TenantsController } from './TenantsController';
import { Services } from '../../Services/Services';
import { Views } from '../../Views/Views';

export class AddNewAccountToTenant extends UIController {


    @State()
    private checked: boolean;

    @State()
    private showErrors: boolean;

    @State()
    private tenant_info: IGetTenantByIdResponse;

    @State()
    private tenant_id: string;

    @State()
    private tenantName: string;

    @State()
    private formPostTried: boolean;

    private tenantDescription: string;
    private tenantIsActive: boolean;

    @Binding()
    private accountName: string;

    @Binding()
    private isAccountNameInvalid: boolean;

    @Binding()
    private accountEmail: string;

    @Binding()
    private isAccountEmailInvalid: boolean;

    @Binding()
    private accountPassword: string;

    @Binding()
    private isAccountPasswordInvalid: boolean;

    @Binding()
    private isTenantAdmin: boolean;


    protected InitController() {

        this.isAccountEmailInvalid = true;
        this.isAccountNameInvalid = true;


        this.isAccountPasswordInvalid = true;

        this.isTenantAdmin = false;
    }

    public BindRouterParams({ tenant_id, tenant_name }) {

        this.tenant_id = tenant_id;
        this.tenantName = tenant_name;

        if (tenant_id != null) {
            /*   RealmBrokerClient.GetTenantById(tenant_id).then(result => {
                  this.tenant_info = result;
                  this.tenantName = result.tenant_name;
                  this.tenantDescription = result.tenant_description;
              }) */
        }
    }
    public BindModel() {

    }

    private ActionPost() {

        if (this.isAccountEmailInvalid || this.isAccountNameInvalid || this.isAccountPasswordInvalid) {
            this.formPostTried = true;
        } else {
            alert(this.isTenantAdmin);
            RealmBrokerClient.CreateAccountAndAddToTenant(this.tenant_id, this.accountName, this.accountPassword, this.accountEmail, this.isTenantAdmin).then(response => {
                this.navigotor(`/app(realmmanager)/tenant/${this.tenant_id}/accounts`, { state: { tenant_name: this.tenantName }, replace: true });
            });
        }
    }

    private ActionCancel(AppController_ContextAction_SetController: Function) {
        AppController_ContextAction_SetController(new TenantsController());
    }

    public LoadView(): any {
        this.navigotor = bindNavigate();
        return ({ AppController_ContextAction_SetController }) => {
            return (
                UIScene(
                    Views.FormView({
                        header: `Add Account To ${this.tenantName}`,
                        content: (
                            VStack({ alignment: cTopLeading, spacing: 10 })(
                                Views.InputTextView('Full Name *', 'Enter a name', $(this.accountName), true, $(this.isAccountNameInvalid), 'Name is required.', this.formPostTried),
                                Views.EmailInputView('Email Address *', 'Enter email address', $(this.accountEmail), $(this.isAccountEmailInvalid), this.formPostTried),
                                Views.InputPasswordView('Password *', 'Enter a password', $(this.accountPassword), true, $(this.isAccountPasswordInvalid), 'Password required.', this.formPostTried),
                                Views.SwitchView('Is Tenant Admin', $(this.isTenantAdmin)),
                                Views.AcceptButton({ label: 'Create Account', action: () => this.ActionPost() }),

                            ).padding(10).foregroundColor('#676767').height()
                                .marginTop('10px')
                        )
                    })
                )
            )
        }
    }
}