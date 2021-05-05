const KierunekForm = Vue.component('kierunek-form', {
    template: `
<form id="kierunek-form" @submit.prevent="process()" >    
    <table style="width: 800px;">
        <tr>
            <td style="width: 15%;"><label for="name">Nazwa</label></td>
            <td style="width: 85%;"><input type="text" id="name" name="name" v-model="nazwa"></td>
        </tr>
        <tr>
            <td><label for="code">Kod</label></td>
            <td><input type="text" id="code" name="code" v-model="kod"></td>
        </tr>
        <tr>
            <td><label for="level">Stopień</label></td>
            <td>
                <select id="level" name="level" size="2" required v-model="stopien">
                    <option value="inż">I (inż)</option>
                    <option value="mgr">II (mgr)</option>
                </select>
            </td>
        </tr>
        <tr>
            <td style="vertical-align:top"><label for="field">Specjalność</label></td>
            <td><textarea id="field" name="field" v-model="specjalnosc" row="10" columns="80" style="width: 100%; height: 100px;"></textarea></td>
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
            nazwa: "Kierunek studiow",
            kod: "ABC",
            stopien: "inż",
            specjalnosc: "specjalność 1\nspecjalność 2" 
        }
    }, 
    methods: {
        process: function() {
            console.log("form: nazwa=", this.nazwa, "kod=", this.kod, "stopien=", this.stopien, 'specjalnosc=', this.specjalnosc);
            kierunek = {
                nazwa: this.nazwa,
                kod: this.kod,
                stopien: this.stopien,
                specjalnosc: this.specjalnosc
            }
            axios.post("/webresources/kierunki", 
                       JSON.stringify(kierunek), 
                        {   
                            headers: {
                            'Content-Type': 'application/json; charset=UTF-8'
                            }
                        }
            ).then((response) => {
                console.log(response);
                this.$router.push('/lista');
            }).catch(error => {
                alert("Error: " + error)
            });
        }
    }
})
 