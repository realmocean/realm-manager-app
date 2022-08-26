import {
    bindNavigate,
    Color,
    cTopLeading,
    HStack,
    Spinner,
    State,
    Text,
    UIButton,
    UIController,
    UIImage,
    UIScene,
    VStack,
} from '@tuval/forms';

import { IGetTenantByIdResponse, RealmBrokerClient } from '../../Services/RealmBrokerClient';

const fontFamily = '"proxima-nova", "proxima nova", "helvetica neue", "helvetica", "arial", sans-serif'
const img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEoAAABKCAYAAAAc0MJxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAABCUlEQVR4Xu3aMUoDQQCG0VzCY3gOm1zEThAsrT2GR/ImQtpAVjaCRVjxWxxxCa94A9P9fN3A7O4e9gSfx/008T2hIqEioSKhIqEioSKhIqEioSKhIqGiYaFuX07T6+F9k+ZtS5vXECoSKhIqEioSKhIqEioSKhoW6ub5ND29HTZp3ra0eY1hoa6dUJFQkVCRUJFQkVCRUJFQ0bBQnjCRUJFQkVCRUJFQkVCRUJFQkVCcCRUJFQkVCRUJFQkVCRUJFQ0L5ZNG5AkTCRUJFQkVCRUJFQkVCRUJVT0ez4O2aN62uHmFcaEuXY777/sv/V2oKyNUJFQkVCRUJFQkVCRUJFQkVPQVip/sdx+ddLpvQckwsAAAAABJRU5ErkJggg=='
export class DeleteAccountController extends UIController {

    private tenantName: string;

    @State()
    private account_info: any;

    public Invalidate() {
    }

    private isLoading() {
    }

    public BindRouterParams({ account_id }) {
        if (account_id != null) {
            RealmBrokerClient.GetAccountById(account_id).then(result => {
                this.account_info = result;
            })
        }
    }
    public BindModel() {

    }

    private DeleteTenant_Action() {


    }

    private action_Cancel() {
        this.navigotor('/app(realmmanager)/account/list', { replace: true });
    }

    public LoadView(): any {
        return (
            UIScene(
                this.account_info == null ? Spinner() :
                    VStack(
                        VStack({ alignment: cTopLeading })(
                            VStack(
                                Text('Delete Account').fontSize('1.7rem')
                                    .marginTop('10px'),

                                UIImage(img)
                                    .cornerRadius(10)
                                    .minHeight('74px').marginTop('20px')
                                    .overflow('hidden'),
                            ).height(),
                            VStack({ alignment: cTopLeading, spacing: 10 })(
                                Text(this.account_info.account_name).lineHeight('1.45rem').fontSize('1rem'),

                            ).padding(10).foregroundColor('#676767').height()
                                .marginTop('10px'),
                            HStack(
                                UIButton(
                                    Text('Delete Account')
                                ).background({ default: '#15CD72', hover: '#0CB863' })
                                    .foregroundColor(Color.white)
                                    .width('100%').height('3rem').fontSize('.9rem').lineHeight('3rem')
                                    .fontWeight('600')
                                    .border({ default: '1px solid #15CD72', hover: '1px solid #0CB863' })
                                    .transition('all .2s ease-in-out')
                                    .cornerRadius(3)
                                    .marginTop('1.5rem')
                                    .shadow({ focus: '0 0 0 1px #fff, 0 0 2px 2px #0069ff' })
                                    .tabIndex(2)
                                    .onClick(() => this.DeleteTenant_Action())
                            ).height()
                        ).border('2px solid #f1f1f1').padding('1rem').margin('2rem')
                            .width(600).height(),
                        HStack(
                            Text('Cancel').onClick(() => this.action_Cancel())
                        ).height()
                    ).padding(20)
            )
        )
    }
}