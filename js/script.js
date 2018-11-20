const test_case = {
    request_client: "cakes",

    response_from_server: {
        amount_of_results: 3,
        results_titles: ["Napoleon", "Mozart", "Cherry"],
        results_image: ['./img/napoleon.jpg', './img/mozart.jpg', './img/cherry.jpg'],
        results_description: ["This Russian Napoleon cake recipe is made with up to 16 layers of dough filled with a custard cream and is considered a national dessert.",
        "This is one version of a famous cake that originated in Austria",
        "A lovely cherry sponge cake with a little extra texture from the ground almonds."],
        results_links: ['https://www.videoculinary.ru/recipe/tort-napoleon/', 'http://tortydoma.ru/vse-torty/mocart.html', 'http://vsedeserti.ru/torti/prostoj-recept-torta-s-sochnoj-vishnej/']
    }
};
const result_maker = (title, link, image, description, index) => {
    let container = $("<li></li>")
        .addClass("item")
        .html("<div><h2>" + title + "</h2><a target='_blank' href='" + link + "'>" + link + "</a><p>" + description + "</p></div><img src='" + image + "'>")
        .appendTo($(".table"));

    setTimeout(() => container.addClass("loaded"), index * 60);
};
const check_for_remove = (elem) => {
    if($(elem).length > 0) {
        while($(elem).length !== 0){
            $(elem).remove();
        }
    }
};

$('.clear').click(() => {
    const box = $('.search-box');
    if (box.val().length > 0) {
        box.val('');
        return true;
    }
    return null;
});
$('.search-btn').click(() => {
    const request = $('.search-box').val();

    if (request.length === 0 || test_case.request_client !== request){
        $('.search-box').val("Search Error");
    }

    check_for_remove('.item');

    const req_obj = test_case.response_from_server;

    //get response of results via ajax
    for (let i = 0; i < req_obj.amount_of_results; i++) {
        result_maker(req_obj.results_titles[i], req_obj.results_links[i], req_obj.results_image[i], req_obj.results_description[i], i);
    }

    console.log(request);
});
$('.search-box').on('input', () => {
    const typo = $('.search-box').val();
    const tooltip = $('.tooltip');

    check_for_remove('.t-item');

    if(typo.length > 0 && test_case.request_client.indexOf(typo) === 0 && test_case.request_client !== typo){
        $('<li>' + test_case.request_client + '</li>')
            .addClass('t-item')
            .appendTo($('.typos'));
        tooltip.toggleClass('disabled', false).toggleClass('showed', true);
    } else {
        tooltip.toggleClass('disabled', true).toggleClass('showed', false);
    }
});
$('.tooltip').click(function(event) {
    const tooltip = $('.tooltip');
    $('.search-box').val($(event.target).text());
    check_for_remove('.t-item');
    tooltip.toggleClass('disabled', true).toggleClass('showed', false);
});