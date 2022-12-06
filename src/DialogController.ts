import { Dialog, State, UIFormController } from "@tuval/forms";

export class DialogController extends UIFormController {

    @State()
    public dialog: Dialog;

    public setHeight(value) {
        this.dialog.Height = value;
    }

    public setWidth(value) {
        this.dialog.Width = value;
    }

    public InitController() {

        const self = this;
        const dialog = class extends Dialog {
            public override InitComponents() {
                this.Text = '';
              

                this.Controls.Add(self);
            }

           

            public override OnShown(): void {
                
            }


        }

        this.dialog = new dialog();

    }


    protected UseRouter() {
        return false;
    }

    protected override BindRouterParams({  }) {
      
    }

    public ShowDialogAsync(): Promise<any> {
        return this.dialog.ShowDialogAsync();
    }


    public OnOKClick() {
        (this.dialog as any).ShowDialogAsyncResolve();
        this.dialog.Hide();
    }

    public OnCancel() {
        this.dialog.Hide();
    }

}
