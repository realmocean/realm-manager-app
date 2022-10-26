import {
    cTopLeading, HStack,
    IconLibrary,
    Spacer,
    Spinner,
    State,
    Text,
    TextField, UIController,
    UIScene,
    VStack
} from '@tuval/forms';

import { UIButtonView } from '@realmocean/buttons';


import { IAccount, ITenant, useOrgProvider } from '@realmocean/common';
import { Color, UIRouteLink } from '@tuval/forms';
import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';
import { ITableViewColumn, Views } from '../../Views/Views';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif'

const columns: ITableViewColumn[] = [
    {
        title: 'Account Name',
        key: "Name"
    },
    {
        title: 'First Name',
        key: "FirstName"
    },
    {
        title: 'Last Name',
        key: "LastName"
    },
    {
        title: 'Updated At',
        key: "UpdatedAt"
    },

    {
        title: '',
        view: (account: IAccount) => (
            HStack(
                Views.ActionContextMenu([
                    {
                        title: 'Edit',
                        icon: '\\d202',
                        tooltip: 'Edit',
                        iconColor: '#505A64',
                        link: `/app(realmmanager)/account/${account.Id}/edit`,
                        linkState: { position: account }
                    },
                    {
                        title: 'Delete',
                        icon: '\\d390',
                        tooltip: 'Delete',
                        iconColor: Color.red400 as any,
                        link: `/app(realmmanager)/account/${account.Id}/delete`,
                        linkState: { position: account }
                    }
                ])
            )
        )
    }
]

export class AccountListController extends UIController {

    @State()
    private accounts: IAccount[];

    @State()
    private showingAccounts:  IAccount[];

    @State()
    private texts: string;

    public Invalidate() {
        this.accounts = null;
    }

    private isLoading() {
        return this.accounts == null;
    }

    public BindRouterParams() {
        this.accounts = null;

        const orgService = useOrgProvider();

        //  if (this.tenants == null) {
        orgService.getAccounts().then(accounts => {
            this.showingAccounts = this.accounts = accounts;
        })
        //  }
    }

    public BindModel() {

    }

    private Search_Action(value: string): void {
        this.showingAccounts = this.accounts.filter((account: IAccount) => account.Name.toLowerCase().indexOf(value.toLowerCase()) > -1);
    }

    public LoadView(): any {
        return ({ AppController_ContextAction_SetController }) => {
            return (
                UIScene(
                    HStack({ alignment: cTopLeading })(
                        LeftSideMenuView('', 'Accounts'),
                        Views.RightSidePage({
                            title: 'Accounts',
                            content: (
                                HStack({ alignment: cTopLeading })(
                                    this.isLoading() ?
                                        VStack(Spinner()) :
                                        VStack({ alignment: cTopLeading, spacing: 10 })(
                                            HStack(
                                                // MARK: Search Box
                                                HStack(
                                                    TextField().placeholder('Search by Account Name')
                                                        .onTextChange((value) => this.Search_Action(value))
                                                ).border('solid 1px #dfdfdf').padding(10).width(300).cornerRadius(5),
                                                Spacer(),
                                                UIRouteLink('/app(realmmanager)/account/add')(
                                                    UIButtonView().text('New Account')
                                                )
                                            ).height().marginBottom('24px'),
                                            Views.TableView(columns, this.showingAccounts)
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