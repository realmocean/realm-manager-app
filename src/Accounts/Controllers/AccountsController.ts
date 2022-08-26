import { cTopLeading, HStack, UIController, UIRouteOutlet, UIScene } from '@tuval/forms';

import { LeftSideMenuView } from '../../App/Views/LeftSideMenu';


export class AccountsController extends UIController {





    public BindModel() {

    }


    public LoadView(): any {
        return ({ AppController_ContextAction_SetController }) => {
            return (
                UIScene(
                    HStack({ alignment: cTopLeading })(
                        LeftSideMenuView('', 'Accounts'),
                        UIRouteOutlet().width('100%').height('100%')
                    )
                )

            )
        }
    }
}