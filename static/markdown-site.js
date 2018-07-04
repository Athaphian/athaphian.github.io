function initMarkdownSite(elementId, pagesPath) {
    showdown.setOption('strikethrough', true);
    showdown.setOption('tables', true);
    const converter = new showdown.Converter();
    const url = new URL(window.location);
    let page = url.searchParams.get("page");

    if (!page) {
        page = 'index';
    }

    $.get(`${pagesPath}${page}.md`).then(data => {
        const elem2 = document.getElementById(elementId);
        elem2.innerHTML = converter.makeHtml(data);
    });
}