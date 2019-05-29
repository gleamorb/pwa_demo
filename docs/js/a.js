$('document').ready(function() {
    $('#btn').click(function() {

        var id = $('#user_id').val();
        var pass = $('#passwd').val();

        var shaId = new jsSHA(id, "ASCII");
        var idSha = shaId.getHash("SHA-256", "HEX");

        var shaPass = new jsSHA(pass, "ASCII");
        var passSha = shaPass.getHash("SHA-256", "HEX");

        if(idSha == getId()
        && passSha == getPass()){
            document.cookie = 'data=' + idSha;

            window.open("./process_map.html", "_self");
            return false;
        }

        return false;
    });
});