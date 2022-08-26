import { TForm } from '@tuval/forms';
import { AppController } from './App/Controllers/AppController';
import { CodeEditor } from '@tuval/components/codeeditor';


export class MainForm extends TForm {
    m_Toolbar: any;
    m_tbiLabel: any;
    public override InitComponents() {
        this.Width = 1120;
        this.Height = 700;
        this.Text = 'Realm Manager';

        this.Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTZEaa/1AAAD2ElEQVRoQ91ZWU8UQRDev+ODzyYmPpiYGDU8+KLREEyIiQai8eABJESIIBoBQQJBIgIKuiCHohIPhABeaESQYEARlUsQuY/lkC37W5xxe6d7tmfZZVm/5NuprtnurumprumuthHRmhkWkURZ12qoqvYlRcflMtW/e9nX71PZvSaKTy2mLbtPcfd8pVCpwriUImrv7CXHwiIrrmJxaZnOXbZD1P/3rLkNZR0zsw56/a6LYpIKUOTaVKVQacaSygaanJ5johEqRrtjfHKGCu1PIXJ9eKNQKSJGdmR0kolyWDVaAwYBbsTA9SmjUOnOzdujqPFVBzmdTlY0h69GA2i/pbWbtobFoMjZ4EmhUuPeyGT6/HWIiWpYi9EaBofHKOJYOkTOFncKlSAqogEr8IfRwMTULEXF8lHInULlnvBE6h8aZaIatIiQnGknuBOD3taOffGUU/jAEGm8wcxwgwKd9A2qGYyJmZp9B6KhHRkx4UbHppjoHRg4DCAD1wZXAOua2rxOOoyY/W4TREN9VaI+3Mkb6p+348LV5QoZV6tpafk3E+XA6Hp+9XxlbEqhK1abAQ/m+TZ1AW4x8OMXE+XA60JEYdDrrZUqE773+zAXCvXK5TXNpm6hEop8pTfDV1aclHejFqLr/64fOPvwzwkohZidc9CJhHyIXGf+5JnzxTTvkEeXrp4B2rTtKMRVo/EUeBoRoC+taoBo6MjfNHvbeCDMAYZVo993fEFBiE+9g4bYGyh6m1c1j1twsdn2H7lAYxPTLqUnEEku5lRAFHYSCJq9dSwp4CK2lKwyabz81j+itIDxJ80GEXrct2FXIcPDure4CBsPJFs/9LCLEQuLS5SYVipf0Cwz10jPq4YobDiQlA0kJml+ySOydXb3/VXxwCLo8OksiMKGA0m4QFFZHd2sqDcw8mSm3OjpmXk6dDwDorDhYFJq9NDIOO08kABRWDGY/L9GOpg+Db8V+TPo8umQjB4hGac32hcxPDpNujHQv4gbbe1xu7pRutLT1x5MDr1VHn5CYT2NzTQyrwwbZ+dy/kq5aV7EsHMBg7lHRFIGyRkZ8LYNe0RQZTceCMPXtBsHVfIeiDT+chWVvAfsgV0Mej2uEVAlw4S4vl4ZphdvPuLC1eUKoNVc3qXcSoiGdmQMSC4PtJo1nZtfkGZN0VbBrSeEhZnKyGqwlDXVqDJBPAGj/JGfxnGGluMQUajUGIyTAJUEp1DpzvU8c4EL7Tp4FkXOBk8KlSKG1OmWJ/15jogJjFNeq8tfoVKFvp7Y4v+oZ/XYw51CpVWqnI1jQYRvgPs930i2PwqX/heU4uCTAAAAAElFTkSuQmCC';
        this.ShowHeader = true;
        this.HeaderPadding = '0px';
        this.HeaderColor = '#FFFFFF';
        this.HeaderSubStyle = 'display: flex;background: #031b4d;height: 40px;align-items: center;width: 220px;min-width: 220px;max-width: 220px;color: white;padding-left: 10px;';

        const appController = new AppController();
        appController.Bind(this);
        this.Controls.Add(appController);

        this.DefaultUrl = '/app(realmmanager)/dashboard';
        //this.Controls.Add(new CodeEditor());
    }
}