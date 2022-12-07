import {
    cHorizontal,
    cLeading,
    cTop,
    cTopLeading,
    cTrailing,
    cVertical,
    ForEach,
    HStack,
    Icon,
    IconLibrary,
    ScrollView,
    Spacer,
    Spinner,
    State,
    Text,
    TextAlignment,
    TextField,
    UIButton,
    UIController,
    UIImage,
    UIScene,
    VStack,
} from '@tuval/forms';
import { moment } from '@tuval/core';

import { UIButtonView } from '@realmocean/buttons'

import { RealmBrokerClient, IGetTenantsResponce } from '../../Services/RealmBrokerClient';
import { Color, UIRouteLink } from '@tuval/forms';
import { Services } from '../../Services/Services';
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';
import { ITableViewColumn, Views } from '../../Views/Views';
import { ITenant, useOrgProvider } from '@realmocean/common';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif'
const img = 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBhcmlhLWhpZGRlbj0idHJ1ZSI+PHBhdGggZD0iTTExLjI4IDYuNzhhLjc1Ljc1IDAgMDAtMS4wNi0xLjA2TDcuMjUgOC42OSA1Ljc4IDcuMjJhLjc1Ljc1IDAgMDAtMS4wNiAxLjA2bDIgMmEuNzUuNzUgMCAwMDEuMDYgMGwzLjUtMy41eiI+PC9wYXRoPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE2IDhBOCA4IDAgMTEwIDhhOCA4IDAgMDExNiAwem0tMS41IDBhNi41IDYuNSAwIDExLTEzIDAgNi41IDYuNSAwIDAxMTMgMHoiPjwvcGF0aD48L3N2Zz4='
const columns: ITableViewColumn[] = [
    {
        title: 'Issue Title',
        view: (issue: any) => {
            return (
                HStack({ alignment: cLeading, spacing: 10 })(
                    issue.state === 'closed' ? Icon('\\e86c').size(20).foregroundColor('#8250df') : Icon('\\ef64').size(20).foregroundColor('#1a7f37'),
                    Text(issue.title).multilineTextAlignment(TextAlignment.leading)
                )
            )
        }
    },
    {
        title: 'Type',
        width: '100px',
        titleAlignment: 'middle',
        view: (issue: any) => {
            return (
                VStack(
                    ...ForEach(issue.labels)((label: any) =>
                        label.name.indexOf('@') === -1 ? Text(label.name).foregroundColor(Color.white).background('#' + label.color)
                        .padding(5).fontSize(12).padding(cHorizontal, 10).cornerRadius(24) : null
                    )


                )
            )
        }
    },

    {
        title: 'Created At',
        view: (issue: any) => {
            return (
                Text(moment(issue.created_at).format('DD.MM.YYYY HH:mm:ss'))
            )
        }
    },
    {
        title: 'Closed At',
        view: (issue: any) => {
            return (
                issue.closed_at == null ? Text('') : Text(moment(issue.closed_at).format('DD.MM.YYYY HH:mm:ss'))
            )
        }
    },
    {
        title: 'State',
        key: "state"
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
                                        ScrollView({ axes: cVertical, alignment: cTop })(
                                            Views.TableView(columns, this.showingIssues)
                                        )
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