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
    $,
    cTop,
    cTrailing,
    ForEach,
    ScrollView,
    cVertical,
    RenderingTypes
} from '@tuval/forms';

import { RealmBrokerClient, IGetTenantByIdResponse } from '../../Services/RealmBrokerClient';

import { Color, UIImage, UIRouteLink, NavigateFunction, bindNavigate, Binding } from '@tuval/forms';
import { ActionButton } from '../../Views/ActionButton';

import { Services } from '../../Services/Services';
import { Views } from '../../Views/Views';
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';
import { UITextBoxView } from '@realmocean/inputs';
import { UIButtonView, UISwitch } from '@realmocean/buttons';
import { useOrgProvider } from '@realmocean/common';
import { is } from '@tuval/core';

const changelog = require('./changelog.md').default;

export class ChangeLogController extends UIController {

    @State()
    private formIsReady: boolean;

 

    public BindRouterParams({ tenant_id, account_id }) {

       

    }


   

    public LoadView(): any {
        this.navigotor = bindNavigate();
        return ({ AppController_ContextAction_SetController }) => {
            return (
                UIScene(

                    HStack({ alignment: cTopLeading })(
                        LeftSideMenuView('', 'Change Log'),
                        Views.RightSidePage({
                            title: `Change Log`,
                            content: (
                                ScrollView({ axes: cVertical, alignment: cTop })(
                                    VStack({ alignment: cLeading, spacing: 10 })(
                                        Text(changelog).render(RenderingTypes.Markdown).width('100%')
                                    ).padding('1rem')
                                       .height()
                                )

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