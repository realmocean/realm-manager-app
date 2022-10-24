import {
    cHorizontal,
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
} from '@tuval/forms';

import { UIButtonView } from '@realmocean/buttons'

import { RealmBrokerClient, IGetTenantsResponce } from '../../Services/RealmBrokerClient';
import { Color, UIRouteLink } from '@tuval/forms';
import { Services } from '../../Services/Services';
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';
import { ITableViewColumn, Views } from '../../Views/Views';
import { ITenant, useOrgProvider } from '@realmocean/common';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif'

const columns: ITableViewColumn[] = [
    {
        title: 'Title',
        key: "title"
    },
    {
        title: 'Type',
        titleAlignment: 'middle',
        view: (issue: any) => {
            const found = issue.labels.find(label => label.name === 'bug');
            return (
                HStack(
                    found ?
                    Text('bug').background('#D73A4A').padding(5).padding(cHorizontal, '10px').fontSize(12).fontWeight('bold').foregroundColor(Color.white).cornerRadius(10)
                    :
                    Text('Other')
                )
            )
        }
    },
    


    {
        title: 'Created At',
        key: "created_at"
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
                        link: `/app(tenantmanager)/employee/edit/${tenant.Id}`,
                        linkState: { position: tenant }
                    },
                    {
                        title: 'Delete',
                        icon: '\\d390',
                        tooltip: 'Delete',
                        iconColor: Color.red400 as any,
                        link: `/app(tenantmanager)/employee/delete/${tenant.Id}`,
                        linkState: { position: tenant }
                    }
                ])
            )
        )
    }
]

export class IssuesController extends UIController {

    @State()
    private showingIssues: object[];

    public BindRouterParams() {
        this.tenants = null;

        RealmBrokerClient.GetIssues('realmocean', 'realm-manager-app').then((result: object[]) => {

            this.showingIssues = result;
        })
        //  }
    }


    private Search_Action(value: string): void {
        this.showingTenants = this.tenants.filter((tenant: ITenant) => tenant.Name.toLowerCase().indexOf(value.toLowerCase()) > -1);
    }

    public LoadView(): any {
        return ({ AppController_ContextAction_SetController }) => {
            return (
                UIScene(
                    HStack({ alignment: cTopLeading })(
                        LeftSideMenuView('', 'Issues'),
                        Views.RightSidePage({
                            title: 'Issues',
                            content: (
                                HStack({ alignment: cTopLeading })(

                                    VStack({ alignment: cTopLeading, spacing: 10 })(
                                        HStack(
                                            // MARK: Search Box
                                            HStack(
                                                TextField().placeholder('Search by Tenant Name')
                                                    .onTextChange((value) => this.Search_Action(value))
                                            ).border('solid 1px #dfdfdf').padding(10).width(300).cornerRadius(5),
                                            Spacer(),
                                            UIRouteLink('/app(realmmanager)/issue/new')(
                                                UIButtonView().text('New Issue')
                                            )
                                        ).height().marginBottom('24px'),
                                        Views.TableView(columns, this.showingIssues)
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