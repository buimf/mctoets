var order = [0, 1, 2, 3];
// shuffelaar voor arrays
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // zolang er wat te schuffelen blijft...
    while (0 !== currentIndex) {

        // neem een element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // ...en verwissel het met het huidige element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// callback voor de google spreadsheet data JSONP
var fill = function (data) {
        var temp = '<ol>';
        var antwoorden = [];
        // elke entry in de data (nb: geen sanitycheck)
        $.each(data.feed.entry, function (i, v) {
            // bouw geshuffelde antwoorden array
            shuffle(order);
            // houd antwoorden bij
            antwoorden[i] = order[0];
            // antwoorden voor gebruik
            var ans = [];
            /* ja, wat repetitief, maar wel helder */
            ans[order[0]] = Markdown(v.gsx$juist.$t).html;
            ans[order[1]] = Markdown(v.gsx$fout1.$t).html;
            ans[order[2]] = Markdown(v.gsx$fout2.$t).html;
            ans[order[3]] = Markdown(v.gsx$fout3.$t).html;
            /* OMG!1!! inline templating?! */
            temp +=
                '<li class=vraag><strong>' + v.gsx$categorie.$t + '</strong>: ' + Markdown(v.gsx$vraag.$t).html +
                '<ol class=antwoorden>' +
                '<li>' + ans[0] + '</li>' +
                '<li>' + ans[1] + '</li>' +
                '<li>' + ans[2] + '</li>' +
                '<li>' + ans[3] + '</li></ol>' + '</li>';

        });
        temp += '</ol>';
        // toevoegen na de H1
        $('h1').after(temp);
        // FF de antwoorden dumpen...
        console.log(antwoorden)
    }
    // klaar!