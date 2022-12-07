import {
    cLeading,
    Color, Context, HStack, Icon, RoundedRectangle, State, TextField, TForm, UIButton, UIController, Text,
    UIScene,
    VStack
} from '@tuval/forms';
import { RealmBrokerClient } from '../../Services/RealmBrokerClient';
import { theme } from '../../theme/theme';
import { Routes } from '../Views/Routes';

const manifest = require('../../manifest');
declare var WebFont;

export const SearchBar = (text: string, action: Function, hideAction: Function, minimizeAction: Function, maximizeAction: Function) =>
    HStack({ spacing: 10 })(
        Icon("\\e8b6").size(30).foregroundColor("#D3D3D3").cursor("pointer"),
        TextField().fontSize("15px").placeholder(text)
            .onTextChange((value) => action(value)).fontFamily("Montserrat"),
        HStack({ alignment: cLeading, spacing: 8 })(
            UIButton(
                RoundedRectangle().backgroundColor('#FF605C').cornerRadius('50%').padding(1).width(11).height(11)
            ).action(hideAction),
            UIButton(
                RoundedRectangle().backgroundColor('#FFBD47').cornerRadius('50%').padding(1).width(11).height(11)
            ).action(minimizeAction),
            UIButton(
                RoundedRectangle().backgroundColor('#00CD4D').cornerRadius('50%').padding(1).width(11).height(11)
            ).action(maximizeAction)
        ).height().padding(20).width(),
    ).paddingLeft("10px").width("100%").height(50).shadow("rgb(0 0 0 / 0%) 0px 1px 20px, rgb(0 0 0 / 24%) 0px 1px 20px")
export class AppController extends UIController {

    private form: TForm;

    @State()
    private realmName: string;

    @State()
    private SideBarExpanded: boolean;

    @State()
    private Code: string;

    @State()
    private searchText: string;

    @State()
    private currentController: UIController;


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

    protected InitController() {

        WebFont.load({
            google: {
                families: ['Poppins:400,500,600,700', 'sans serif']
            }
        });

        WebFont.load({
            google: {
                families: ['Manrope:400,500,600,700', 'sans serif']
            }
        });

        WebFont.load({
            google: {
                families: ['Inter:400,500,600,700', 'sans serif']
            }
        });

    }

    public OnBindModel(form: TForm) {
        this.form = form;
        RealmBrokerClient.GetRealmInfo('REALM_NAME').then(realm_info => {
            this.realmName = realm_info.value;
        })
    }
    public LoadView() {
      
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