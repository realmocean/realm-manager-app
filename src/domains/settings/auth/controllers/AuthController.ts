import {
    cHorizontal,
    cLeading,
    Color,
    cTopLeading,
    cTrailing,
    ForEach,
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
    UIImage,
    UIScene,
    VStack,
} from '@tuval/forms';

import { UIButtonView } from '@realmocean/buttons'


import { ITenant, useOrgProvider } from '@realmocean/common';
import { LeftSideMenuView } from '../../../../App/Views/LeftSideMenu';
import { Views } from '../../../../Views/Views';
import { OAuth2Providers } from '../OAuth2Providers';
import { OAuth2ProviderSettingsDialog } from './OAuth2ProviderSettingsDialog';




export class AuthController extends UIController {

    public BindRouterParams() {

    }



    public LoadView(): any {
        return ({ AppController_ContextAction_SetController }) => {
            return (
                UIScene(
                    HStack({ alignment: cTopLeading })(
                        LeftSideMenuView('', 'Auth'),
                        Views.RightSidePage({
                            title: 'Auth',
                            content: (
                                HStack({ alignment: cTopLeading })(
                                    ...ForEach(OAuth2Providers)(provider =>
                                        HStack(
                                            VStack(
                                                HStack(
                                                    UIImage(provider.icon).imageWidth(30).imageHeight(30)
                                                )
                                                    .width()
                                                    .height()
                                                    .border('solid 1px hsl(240 30% 96%)')
                                                    .padding(10).cornerRadius('50%').background('rgb(250,250,255)'),
                                                Text(provider.name).marginTop('8px'),
                                                HStack(
                                                    Text('disabled').lineHeight(30)
                                                )
                                                    .width()
                                                    .height()
                                                    .marginTop('24px')
                                                    .background('rgb(242,242, 248)')
                                                    .padding(cHorizontal, 12)
                                                    .cornerRadius(15)
                                            )
                                                .cornerRadius(10)
                                                .background(Color.white)
                                                .height(186)
                                                .width(212)
                                                .border('solid 1px rgb(242, 242, 248)')
                                        ).width().height().padding(10)
                                        .cursor('pointer')
                                        .onClick(()=> OAuth2ProviderSettingsDialog.Show(provider))
                                    )

                                ).wrap('wrap').padding(20)
                            )
                        })
                    )



                )

            )
        }
    }

}