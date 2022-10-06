import {
    Color, Context, HStack, State, TForm, UIController,
    UIScene,
    VStack
} from '@tuval/forms';
import { RealmBrokerClient } from '../../Services/RealmBrokerClient';
import { theme } from '../../theme/theme';
import { Routes } from '../Views/Routes';

const manifest = require('../../manifest');



export class AppController extends UIController {

    private form: TForm;

    @State()
    private realmName: string;

    @State()
    private SideBarExpanded: boolean;

    @State()
    private Code: string;

    @State()
    private currentController: UIController;


    protected InitController() {

    }

    @Context()
    private AppController_ContextAction_SetController(controller: UIController) {
        this.currentController = controller;
        (this as any).currentController.BindModel();
    }

    @Context()
    private GetTheme(): any {
        return theme;
    }

    private OnMenuSelected(item: any) {

    }
    public OnBindModel(form: TForm) {
        this.form = form;
        RealmBrokerClient.GetRealmInfo('REALM_NAME').then(realm_info => {
            this.realmName = realm_info.value;
        })
    }
    public LoadView() {
        console.log(theme);
        return (
            UIScene(
                HStack(
                    VStack(
                        Routes()
                    )
                )
            )
        )

    }
}