import {
    cTopLeading,
    HStack, UIController,
    UIScene
} from '@tuval/forms';

import { UIRouteOutlet } from '@tuval/forms';


const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif'

export class AccountsController extends UIController {

    public LoadView(): any {

            return (
                UIScene(
                    HStack({ alignment: cTopLeading })(
                        
                        UIRouteOutlet().width('100%').height('100%')
                    )
                )

            )
        
    }
}