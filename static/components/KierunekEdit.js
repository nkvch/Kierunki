const KierunekEdit = Vue.component('kierunek-edit', {
    template: `
<form id="kierunek-edit" @submit.prevent="process()" >    
    <table style="width: 800px;">
        <tr>
            <td style="width: 15%;"><label for="nameChosen">Nazwa kierunka do edycji</label></td>
            <td style="width: 85%;"><input type="text" id="nameChosen" name="nameChosen" v-model="nazwaChosen"></td>
        </tr>
        <tr>
            <td><label for="codeChosen">Kod kierunka do edycji</label></td>
            <td><input type="text" id="codeChosen" name="codeChosen" v-model="kodChosen"></td>
        </tr>
        <tr>
            <td colspan="2">
            </td>
        </tr>
    </table> 
    <table style="width: 800px;">
        <tr>
            <td style="width: 15%;"><label for="nameEdited">Nazwa nowa</label></td>
            <td style="width: 85%;"><input type="text" id="nameEdited" name="nameEdited" v-model="nazwaEdited"></td>
        </tr>
        <tr>
            <td><label for="codeEdited">Kod nowy</label></td>
            <td><input type="text" id="codeEdited" name="codeEdited" v-model="kodEdited"></td>
        </tr>
        <tr>
            <td><label for="levelEdited">Stopień nowy</label></td>
            <td>
                <select id="levelEdited" name="levelEdited" size="2" required v-model="stopienEdited">
                    <option value="inż">I (inż)</option>
                    <option value="mgr">II (mgr)</option>
                </select>
            </td>
        </tr>
        <tr>
            <td style="vertical-align:top"><label for="fieldEdited">Specjalność nowa</label></td>
            <td><textarea id="fieldEdited" name="fieldEdited" v-model="specjalnoscEdited" row="10" columns="80" style="width: 100%; height: 100px;"></textarea></td>
        </tr>
        <tr>
            <td colspan="2">
                <button type="submit" style="width: 80px; display: block; margin: auto">OK</button>
            </td>
        </tr>
    </table>
</form>` ,
    data: function() {
        return {
            nazwaChosen: "Kierunek studiow",
            kodChosen: "ABC",
            nazwaEdited: "Bardzo dobry kierunek studiow",
            kodEdited: "ABCDEGF",
            stopienEdited: "inż",
            specjalnoscEdited: "specjalność 1\nspecjalność 2" 

        }
    },
    methods: {
        process: function() {
            console.log("form: nazwaChosen=", this.nazwaChosen, "kodChosen=", this.kodChosen, "nazwaEdited=", this.nazwaEdited, "kodEdited=", this.kodEdited, "stopienEdited=", this.stopienEdited, 'specjalnoscEdited=', this.specjalnoscEdited);
            dane = {
                nazwaChosen: this.nazwaChosen,
                kodChosen: this.kodChosen,
                nazwaEdited: this.nazwaEdited,
                kodEdited: this.kodEdited,
                stopienEdited: this.stopienEdited,
                specjalnoscEdited: this.specjalnoscEdited
            }
            axios.post("/webresources/editingKierunki", 
                       JSON.stringify(dane), 
                        {   
                            headers: {
                            'Content-Type': 'application/json; charset=UTF-8'
                            }
                        }
            ).then((response) => {
                console.log(response);
                this.$router.push('/lista');
            }).catch(error => {
                alert("Error in editing: " + error)
            });
        }
    }
})