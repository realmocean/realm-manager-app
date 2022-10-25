import {
    cLeading,
    cTopLeading,
    cTrailing,
    HStack,
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
    Button,
    ScrollView,
    cVertical
} from '@tuval/forms';

import { UIButtonView } from '@realmocean/buttons'

import { RealmBrokerClient, IGetTenantsResponce } from '../../Services/RealmBrokerClient';
import { Color, UIRouteLink } from '@tuval/forms';
import { Services } from '../../Services/Services';
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';
import { ITableViewColumn, Views } from '../../Views/Views';
import { ITenant, useOrgProvider } from '@realmocean/common';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif'


export class NewIssueController extends UIController {

    @State()
    private issueTitle: string;

    @State()
    private issueBody: string;

    @State()
    private issueIsCreating: boolean;

    public BindRouterParams() {

        //  }
    }


    private action_Save(): void {
        this.issueIsCreating = true;
        RealmBrokerClient.CreateIssue('realmocean', 'realm-manager-app', this.issueTitle, this.issueBody).then(result => {
            this.navigotor('/app(realmmanager)/issues');
        })
    }

    public LoadView(): any {
        return ({ AppController_ContextAction_SetController }) => {
            return (
                UIScene(
                    HStack({ alignment: cTopLeading })(
                        LeftSideMenuView('', 'Issues'),
                        Views.RightSidePage({
                            title: 'Create Issue',
                            content: (
                                    HStack({ alignment: cTopLeading })(
                                        VStack({ alignment: cTopLeading, spacing: 10 })(
                                            HStack(
                                                TextField().onTextChange(e => this.issueTitle = e).fontSize(16)
                                            ).border('solid 1px rgba(125,125,125,0.5)').height().padding(10).cornerRadius(10),
                                            HStack(
                                                TextField().multiline(true).onTextChange(e => this.issueBody = e).height(200).fontSize(16)
                                            ).border('solid 1px rgba(125,125,125,0.5)').height().padding(10).cornerRadius(10),
                                            HStack({ alignment: cTrailing })(
                                                Button(
                                                    Text('Create issue')
                                                ).onClick(() => this.action_Save() )
                                                    .loading(this.issueIsCreating)
                                                    .width(200)
                                            ).height()
                                        )
                                    ).background(Color.white)
                                
                            )
                        })
                    )



                )

            )
        }
    }

}