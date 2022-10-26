import {
    Button, cTop, cTopLeading, cTrailing,
    cVertical, HStack, Icon,
    RenderingTypes, ScrollView, Spinner,
    State,
    Text, UIController,
    UIScene,
    VStack
} from '@tuval/forms';

import { bindNavigate, Color } from '@tuval/forms';


import { IAccount, ITenant, useOrgProvider } from '@realmocean/common';
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';
import { Views } from '../../Views/Views';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif'
const img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABKCAYAAAAc0MJxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAABCUlEQVR4Xu3aMUoDQQCG0VzCY3gOm1zEThAsrT2GR/ImQtpAVjaCRVjxWxxxCa94A9P9fN3A7O4e9gSfx/008T2hIqEioSKhIqEioSKhIqEioSKhIqGiYaFuX07T6+F9k+ZtS5vXECoSKhIqEioSKhIqEioSKhoW6ub5ND29HTZp3ra0eY1hoa6dUJFQkVCRUJFQkVCRUJFQ0bBQnjCRUJFQkVCRUJFQkVCRUJFQkVCcCRUJFQkVCRUJFQkVCRUJFQ0L5ZNG5AkTCRUJFQkVCRUJFQkVCRUJVT0ez4O2aN62uHmFcaEuXY777/sv/V2oKyNUJFQkVCRUJFQkVCRUJFQkVPQVip/sdx+ddLpvQckwsAAAAABJRU5ErkJggg=='
export class DeleteAccountController extends UIController {

    private tenantName: string;

    @State()
    private deleting: boolean;

    @State()
    private account: IAccount;



    public BindRouterParams({ account_id }) {

        const orgService = useOrgProvider();
        orgService.getAccountById(account_id).then(result => {
            this.account = result;
        })

    }
    public BindModel() {

    }


    private action_Delete() {
        this.deleting = true;
        const orgService = useOrgProvider();
        orgService.deleteAccountById(this.account.Id).then(result =>
            this.navigotor('/app(realmmanager)/account/list')
        )
    }

    public LoadView(): any {
        this.navigotor = bindNavigate();
        return ({ AppController_ContextAction_SetController }) => {
            return (
                UIScene(
                    HStack({ alignment: cTopLeading })(
                        LeftSideMenuView('', 'Tenants'),
                        Views.RightSidePage({
                            title: `Delete Account`,
                            content: (
                                this.account ?
                                    ScrollView({ axes: cVertical, alignment: cTop })(
                                        VStack({ alignment: cTop, spacing: 10 })(

                                            Icon('\\e14b').fontSize(50).foregroundColor(Color.red),
                                            Text(`
## ${this.account?.Name}
### Are you sure you want to delete this account?
- This cannot be undone
- Only Realm Managers can delete accounts
- Deletion will also delete all data associated with this account`)
                                                .render(RenderingTypes.Markdown)
                                            ,
                                            HStack({ alignment: cTrailing })(
                                                Button(
                                                    Text('Delete this account')
                                                )
                                                    .loading(this.deleting)
                                                    .color('danger')
                                                    .onClick(() => this.action_Delete())
                                            ).height(),
                                        ).padding('1rem')
                                            .width(600).height()
                                    )
                                    :
                                    Spinner()


                                /*  VStack({ alignment: cTopLeading, spacing: 10 })(
                                     Views.InputTextView('Full Name *', 'Enter a name', $(this.accountName), true, $(this.isAccountNameInvalid), 'Name is required.', this.formPostTried),
                                     Views.EmailInputView('Email Address *', 'Enter email address', $(this.accountEmail), $(this.isAccountEmailInvalid), this.formPostTried),
                                     Views.InputPasswordView('Password *', 'Enter a password', $(this.accountPassword), true, $(this.isAccountPasswordInvalid), 'Password required.', this.formPostTried),
                                     Views.SwitchView('Is Tenant Admin', $(this.isTenantAdmin)),
                                     Views.AcceptButton({ label: 'Create Account', action: () => this.ActionPost() }),

                                 ).background(Color.white) */
                            )

                        })
                    )

                )
            )

        }
    }
}