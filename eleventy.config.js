import {EleventyRenderPlugin} from "@11ty/eleventy";

export default function (eleventyConfig) {
    // Official Eleventy Plugins
    eleventyConfig.addPlugin(EleventyRenderPlugin);

    // Passthrough file copy
    eleventyConfig.addPassthroughCopy({"src/assets": "assets"});
    eleventyConfig.addPassthroughCopy({"src/favicon.ico": "favicon.ico"});
    eleventyConfig.addPassthroughCopy({"src/robots.txt": "robots.txt"});

    // Date filters using native JavaScript
    eleventyConfig.addFilter("readableDate", (dateObj) => {
        if (!dateObj) return '';
        const date = typeof dateObj === 'string' ? new Date(dateObj) : dateObj;
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
            timeZone: 'UTC'
        }).format(date);
    });

    eleventyConfig.addFilter("htmlDateString", (dateObj) => {
        if (!dateObj) return '';
        const date = typeof dateObj === 'string' ? new Date(dateObj) : dateObj;
        return date.toISOString().split('T')[0];
    });

    eleventyConfig.addFilter("currentYear", () => {
        return new Date().getFullYear();
    });

    // Markdown rendering filter (for inline markdown in about data)
    eleventyConfig.addAsyncFilter("markdown", async (content) => {
        if (!content) return '';
        const fn = await EleventyRenderPlugin.String(content, "md");
        return fn();
    });

    // Projects collection sorted by order
    eleventyConfig.addCollection("projects", (collectionApi) => {
        return collectionApi.getFilteredByGlob("src/projects/*.md").sort((a, b) => {
            return (a.data.order || 999) - (b.data.order || 999);
        });
    });

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes",
            data: "_data"
        },
        templateFormats: ["html", "liquid", "md"],
        htmlTemplateEngine: "liquid",
        markdownTemplateEngine: "liquid"
    };
}
