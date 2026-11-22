/*
 * QUESTION BANK – Advanced Professional WordPress Developer practice quiz
 * ----------------------------------------------------------------------
 * Keep this file next to wp-dev-quiz.html. It's loaded with a <script> tag,
 * which works when the HTML is opened straight from disk.
 *
 * HOW TO ADD A QUESTION: copy a block below, paste it inside the array,
 * and keep the comma between blocks.
 *
 *   id: stable ID like "q-0451". The editor assigns the next free number. Never change or reuse
 *       an ID: the app uses it to remember progress and mistakes, and error reports quote it.
 *   s : section. Must be one of:
 *       WordPress Core, Custom Development, Security, Performance, Change Management, Debugging, Scalability, Disaster Recovery
 *   d : difficulty. 1 = Foundational, 2 = Intermediate, 3 = Advanced
 *   q : the question text
 *   o : answer options (2 to 6). They're shuffled on screen, so don't write "all of the above".
 *   a : the correct answer, as a 0-based index into o
 *         a: 2          → single answer (radio-style; the 3rd option is correct)
 *         a: [0, 2, 3]  → multi-select ("select all that apply"); scored all-or-nothing
 *   t : technical explanation
 *   p : plain-English explanation
 *
 * Example (single answer):
 *   {
 *     s: "Security", d: 2,
 *     q: "Which function escapes a URL for output?",
 *     o: ["esc_html()", "esc_url()", "esc_attr()", "wp_kses()"],
 *     a: 1,
 *     t: "Technical explanation…",
 *     p: "Plain-English explanation…"
 *   },
 *
 * Example (multi-select):
 *   {
 *     s: "Performance", d: 3,
 *     q: "Which of these are anti-patterns?",
 *     o: ["Option A", "Option B", "Option C", "Option D"],
 *     a: [0, 3],
 *     t: "…",
 *     p: "…"
 *   },
 */
window.QUESTION_BANK = [
  {
    id: "q-0001",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "Which default role can publish and manage their own posts, but not other people's?",
    o: ["Subscriber", "Contributor", "Editor", "Author"],
    a: 3,
    t: "Authors can publish and manage their own posts. Editors can also manage other users' posts, Contributors can write but not publish, and Subscribers can only manage their profile.",
    p: "An Author runs their own column. An Editor can change anyone's.",
    refs: ["https://wordpress.org/documentation/article/roles-and-capabilities/"]
  },
  {
    id: "q-0002",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "A guest writer should be able to write and edit their own posts, but not publish them. Which role fits?",
    o: ["Contributor", "Subscriber", "Administrator", "Author"],
    a: 0,
    t: "A Contributor can write and manage their own posts but can't publish them. Someone with the Editor role or above reviews and publishes.",
    p: "They hand in the draft, and someone else presses Publish.",
    refs: ["https://wordpress.org/documentation/article/roles-and-capabilities/"]
  },
  {
    id: "q-0003",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "What's the main difference between posts and pages?",
    o: [
      "There's no difference; they're stored and displayed the same way",
      "Posts are time-based entries shown in date order and feeds; pages are for timeless, standalone content",
      "Pages can contain images but posts can't",
      "Posts are private and pages are public"
    ],
    a: 1,
    t: "Posts are time-oriented and appear in archives and feeds. Pages hold \"static\" information that's typically timeless, like About or Contact.",
    p: "Posts are like a diary or news feed. Pages are like the fixed rooms of the site.",
    refs: ["https://wordpress.org/documentation/article/administration-screens/"]
  },
  {
    id: "q-0004",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 1,
    q: "You want to customise a theme you didn't write, without losing your changes when it updates. What should you use?",
    o: [
      "A child theme",
      "Rename the theme folder",
      "The Theme File Editor in wp-admin",
      "Edit the theme's files directly"
    ],
    a: 0,
    t: "A child theme inherits everything from its parent and lets you override styles, templates and functions without touching the parent's files, so parent updates don't wipe your work.",
    p: "Put your changes in your own layer on top, so the original can be updated safely underneath.",
    refs: ["https://developer.wordpress.org/themes/advanced-topics/child-themes/"]
  },
  {
    id: "q-0005",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "Which file holds a site's database connection settings, such as the database name and password?",
    o: ["wp-config.php", "functions.php", "index.php", ".htaccess"],
    a: 0,
    t: "wp-config.php defines DB_NAME, DB_USER, DB_PASSWORD and DB_HOST, along with salts and other configuration constants.",
    p: "It's the site's settings file that tells WordPress how to reach its database.",
    refs: ["https://developer.wordpress.org/apis/wp-config-php/"]
  },
  {
    id: "q-0006",
    s: "Disaster Recovery", d: 1, level: "Subscriber", stage: 1,
    q: "What should you do before updating WordPress core, themes or plugins on a live site?",
    o: [
      "Back up the database and files, and check the backup works",
      "Change the admin password",
      "Delete the cache folder",
      "Nothing; updates are always safe"
    ],
    a: 0,
    t: "WordPress's own upgrade instructions start with backing up the database and all files, then checking the backups are usable, so you can restore if an update breaks something.",
    p: "Make a copy you can go back to before changing anything.",
    refs: ["https://developer.wordpress.org/advanced-administration/upgrade/upgrading/"]
  },
  {
    id: "q-0007",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "Where do you choose a site's permalink structure, such as /%postname%/?",
    o: ["Settings → General", "Settings → Permalinks", "Tools → Site Health", "Appearance → Customize"],
    a: 1,
    t: "The Settings → Permalinks screen lets you pick a structure or enter a custom one with structure tags.",
    p: "It's where you decide what your page addresses look like.",
    refs: ["https://wordpress.org/documentation/article/customize-permalinks/"]
  },
  {
    id: "q-0008",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "What does a synced pattern do (called a reusable block before WordPress 6.3)?",
    o: [
      "Editing it once updates it everywhere it's used",
      "It syncs content between two different WordPress sites",
      "It backs up a page automatically",
      "It copies blocks into a page, and each copy is then edited separately"
    ],
    a: 0,
    t: "WordPress 6.3 renamed reusable blocks to patterns. A pattern with the Synced option behaves like the old reusable block: edits apply everywhere it's inserted.",
    p: "Change it in one place, and every copy changes with it.",
    refs: [
      "https://wordpress.org/documentation/article/comparing-patterns-template-parts-and-reusable-blocks/"
    ]
  },
  {
    id: "q-0009",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "What does the \"Discourage search engines from indexing this site\" setting do?",
    o: [
      "Deletes the sitemap permanently",
      "Asks search engines not to index the site, which they may or may not honour",
      "Password-protects the site",
      "Blocks all visitors except logged-in users"
    ],
    a: 1,
    t: "The Search Engine Visibility option in Settings → Reading asks search engines not to index the site. It's a request, not access control, so use real protection for private sites.",
    p: "It's a polite \"please don't list me\" sign, not a lock.",
    refs: ["https://wordpress.org/documentation/article/settings-reading-screen/"]
  },
  {
    id: "q-0010",
    s: "Debugging", d: 1, level: "Subscriber", stage: 1,
    q: "Where can you see a summary of critical issues and recommended improvements for a WordPress site?",
    o: ["Settings → Writing", "Tools → Site Health", "Appearance → Widgets", "Users → Profile"],
    a: 1,
    t: "The Site Health screen gives actionable information in the form of critical errors and warnings, plus a technical summary on its Info tab.",
    p: "It's WordPress's built-in check-up for your site.",
    refs: ["https://wordpress.org/documentation/article/site-health-screen/"]
  },
  {
    id: "q-0011",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "In a theme, which file is the usual place to add features like menu support or to load scripts and styles?",
    o: ["readme.txt", "functions.php", "header.php", "style.css"],
    a: 1,
    t: "functions.php is where a theme hooks into WordPress to add features. Only the active theme's functions.php runs, and a child theme can have its own.",
    p: "It's the theme's toolbox of extra behaviour.",
    refs: ["https://developer.wordpress.org/themes/classic-themes/basics/theme-functions/"]
  },
  {
    id: "q-0012",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "What's the correct way for a theme to load a stylesheet on the front end?",
    o: [
      "Add it to wp-config.php",
      "Paste the CSS into every page with the Custom HTML block",
      "Add a <link> tag directly in header.php",
      "Call wp_enqueue_style() from a function hooked to wp_enqueue_scripts"
    ],
    a: 3,
    t: "Enqueueing lets WordPress manage dependencies and versions, avoid loading files twice, and lets other code change or remove them. wp_enqueue_scripts is the hook for front-end assets.",
    p: "Hand your files to WordPress, and it makes sure they load once, in the right order.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_enqueue_style/",
      "https://developer.wordpress.org/reference/hooks/wp_enqueue_scripts/"
    ]
  },
  {
    id: "q-0013",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "Every WordPress theme needs a style.css file. What is its most important job?",
    o: [
      "Storing the theme's database tables",
      "Registering the theme with WordPress through the header comment at the top",
      "Holding all the PHP templates",
      "Setting the site's permalink structure"
    ],
    a: 1,
    t: "style.css's header comment (Theme Name, Description and so on) registers the theme. Child themes also use the Template field to name the parent.",
    p: "The top of style.css is the theme's name badge.",
    refs: ["https://developer.wordpress.org/themes/core-concepts/main-stylesheet/"]
  },
  {
    id: "q-0014",
    s: "Debugging", d: 1, level: "Subscriber", stage: 2,
    q: "What does setting WP_DEBUG to true in wp-config.php do?",
    o: [
      "Automatically fixes PHP errors",
      "Turns on WordPress's debug mode, so PHP notices and warnings are reported",
      "Speeds the site up by skipping plugins",
      "Makes the site read-only"
    ],
    a: 1,
    t: "WP_DEBUG enables debug mode and raises error reporting. Its companions WP_DEBUG_LOG and WP_DEBUG_DISPLAY control whether errors are logged to a file and shown on screen.",
    p: "It tells WordPress to point out problems instead of hiding them.",
    refs: ["https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/"]
  },
  {
    id: "q-0015",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "Which function registers a new shortcode such as [my_button]?",
    o: ["register_shortcode()", "do_shortcode()", "add_shortcode()", "shortcode_atts()"],
    a: 2,
    t: "add_shortcode( $tag, $callback ) registers it. do_shortcode() runs shortcodes in a string, and shortcode_atts() merges attributes with defaults.",
    p: "add_shortcode() teaches WordPress a new tag. The others use or tidy it.",
    refs: ["https://developer.wordpress.org/reference/functions/add_shortcode/"]
  },
  {
    id: "q-0016",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "Which function creates a custom post type such as \"book\"?",
    o: ["add_post_type()", "create_post_type()", "register_post_type()", "wp_insert_post()"],
    a: 2,
    t: "register_post_type() is the core function, usually called on the init hook. wp_insert_post() creates a single post, not a type.",
    p: "It tells WordPress about a new kind of content.",
    refs: ["https://developer.wordpress.org/reference/functions/register_post_type/"]
  },
  {
    id: "q-0017",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "What's the minimum a PHP file needs for WordPress to recognise it as a plugin?",
    o: [
      "A readme.txt file",
      "A class that extends WP_Plugin",
      "Registration on WordPress.org",
      "A header comment with at least a Plugin Name line"
    ],
    a: 3,
    t: "At its simplest, a plugin is a PHP file with a header comment containing Plugin Name. Other header fields are optional.",
    p: "A name tag at the top of the file is enough for WordPress to list it.",
    refs: ["https://developer.wordpress.org/plugins/plugin-basics/header-requirements/"]
  },
  {
    id: "q-0018",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 2,
    q: "Which pair of functions drives the classic WordPress Loop?",
    o: [
      "query_posts() and end_posts()",
      "get_posts() and the_content()",
      "wp_query() and next_post()",
      "have_posts() and the_post()"
    ],
    a: 3,
    t: "while ( have_posts() ) : the_post(); checks for another post and sets up its data, so template tags like the_title() work.",
    p: "One asks \"is there another post?\", and the other says \"get it ready\".",
    refs: [
      "https://developer.wordpress.org/reference/functions/have_posts/",
      "https://developer.wordpress.org/reference/functions/the_post/"
    ]
  },
  {
    id: "q-0019",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "In a block theme, which file defines global settings and styles such as colour palettes and font sizes?",
    o: ["editor.css", "theme.json", "blocks.xml", "functions.php"],
    a: 1,
    t: "theme.json configures editor settings and global styles. Child themes and style variations can override it.",
    p: "It's the theme's style rulebook in one file.",
    refs: ["https://developer.wordpress.org/themes/global-settings-and-styles/style-variations/"]
  },
  {
    id: "q-0020",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 3,
    q: "What does get_template_part( 'parts/card' ) do?",
    o: [
      "Registers a new block called card",
      "Creates a page called Card",
      "Loads the reusable template file parts/card.php from the theme",
      "Downloads a template from WordPress.org"
    ],
    a: 2,
    t: "get_template_part() includes a template file, looking in the child theme first and then the parent, which keeps repeated markup in one place.",
    p: "It pulls in a shared piece of the page, like slotting in a pre-made section.",
    refs: ["https://developer.wordpress.org/reference/functions/get_template_part/"]
  },
  {
    id: "q-0021",
    s: "Custom Development", d: 2, level: "Subscriber", stage: 3,
    q: "In a child theme, which function returns the URL of the child theme's own folder?",
    o: ["get_template_directory_uri()", "get_theme_root()", "get_stylesheet_directory_uri()", "site_url()"],
    a: 2,
    t: "The \"stylesheet\" functions point to the active (child) theme, and the \"template\" functions point to the parent theme.",
    p: "Stylesheet means your child theme. Template means the parent.",
    refs: ["https://developer.wordpress.org/reference/functions/get_stylesheet_directory_uri/"]
  },
  {
    id: "q-0022",
    s: "Change Management", d: 1, level: "Subscriber", stage: 3,
    q: "Which WP-CLI command updates every installed plugin?",
    o: ["wp plugin upgrade *", "wp update plugins", "wp plugin update --all", "wp core update --plugins"],
    a: 2,
    t: "wp plugin update accepts plugin names or --all. Run it after a backup, ideally on staging first.",
    p: "One command to update them all, from the command line.",
    refs: ["https://developer.wordpress.org/cli/commands/plugin/update/"]
  },
  {
    id: "q-0023",
    s: "Disaster Recovery", d: 1, level: "Subscriber", stage: 3,
    q: "A complete WordPress backup needs which two parts?",
    o: [
      "Only the database",
      "The uploads folder and the cache",
      "The database and the site files",
      "The theme and the admin password"
    ],
    a: 2,
    t: "Content and settings live in the database, while themes, plugins, uploads and wp-config.php are files. Backing up one doesn't back up the other.",
    p: "Your words live in the database and your pictures and code live in files. Save both.",
    refs: ["https://developer.wordpress.org/advanced-administration/security/backup/files/"]
  },
  {
    id: "q-0024",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 3,
    q: "An editor accidentally overwrote a paragraph and saved. What's the quickest built-in way to get it back?",
    o: [
      "Restore last night's full-site backup",
      "Reinstall WordPress",
      "Ask the host to roll back the server",
      "Restore an earlier revision of the post"
    ],
    a: 3,
    t: "WordPress stores a revision on each save, and you can compare and restore one from the editor sidebar. A full-site restore would overwrite every other change since the backup.",
    p: "Use the post's own undo history, not the whole site's.",
    refs: ["https://wordpress.org/documentation/article/revisions/"]
  },
  {
    id: "q-0025",
    s: "Security", d: 2, level: "Subscriber", stage: 3,
    q: "What are the typical recommended permissions for WordPress files and directories on a Linux server?",
    o: [
      "Files 644, directories 755",
      "Files 755, directories 644",
      "Files 777, directories 777",
      "Files 600, directories 600"
    ],
    a: 0,
    t: "The hardening guide sets files to 644 and directories to 755: writable only by the owner and readable by everyone, including the web server. 777 lets anyone write.",
    p: "Only the owner can change things, and everyone else can only read.",
    refs: ["https://developer.wordpress.org/advanced-administration/security/hardening/"]
  },
  {
    id: "q-0026",
    s: "Security", d: 2, level: "Subscriber", stage: 3,
    q: "What does is_admin() tell you?",
    o: [
      "Whether the site is in maintenance mode",
      "Whether the current request is for an admin screen",
      "Whether the user can manage options",
      "Whether the current user is an Administrator"
    ],
    a: 1,
    t: "is_admin() only checks whether you're on an admin page, and admin-ajax.php counts too. It's not a permission check. Use current_user_can() for that.",
    p: "It says where you are, not who you are.",
    refs: ["https://developer.wordpress.org/reference/functions/is_admin/"]
  },
  {
    id: "q-0027",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 3,
    q: "What's the role given to a new user by default, unless you change the setting?",
    o: ["Contributor", "Subscriber", "Editor", "Author"],
    a: 1,
    t: "New users get the Subscriber role by default. The default role can be changed in Settings → General.",
    p: "Everyone starts with the most basic access.",
    refs: ["https://learn.wordpress.org/tutorial/developing-with-user-roles-and-capabilities/"]
  },
  {
    id: "q-0028",
    s: "Security", d: 1, level: "Contributor", stage: 1,
    q: "When should data be escaped?",
    o: [
      "Never, if it was sanitised on input",
      "As late as possible, right when it's output",
      "Only for data from logged-out users",
      "Once, when it's saved to the database"
    ],
    a: 1,
    t: "Escape late, for the exact output context (HTML, attribute, URL, JavaScript). Sanitising on input is separate and doesn't replace escaping on output.",
    p: "Wrap things safely at the moment you show them, every time.",
    refs: ["https://developer.wordpress.org/apis/security/escaping/"]
  },
  {
    id: "q-0029",
    s: "Security", d: 1, level: "Contributor", stage: 1,
    q: "How should code check whether the current user may edit posts?",
    o: [
      "current_user_can( 'edit_posts' )",
      "is_admin()",
      "Check whether the user ID is 1",
      "Check whether the user's role name is 'editor'"
    ],
    a: 0,
    t: "Check capabilities, not role names. Roles can be customised and plugins add capabilities, so current_user_can() is the reliable check.",
    p: "Ask \"are they allowed?\" rather than \"what's their job title?\".",
    refs: ["https://developer.wordpress.org/reference/functions/current_user_can/"]
  },
  {
    id: "q-0030",
    s: "Custom Development", d: 2, level: "Contributor", stage: 2,
    q: "You register a custom taxonomy and want it to behave like categories (parent and child terms). Which argument do you set?",
    o: ["'public' => true", "'rewrite' => false", "'show_in_rest' => true", "'hierarchical' => true"],
    a: 3,
    t: "hierarchical => true gives category-style terms with parents. The default (false) behaves like tags.",
    p: "Tick \"hierarchical\" to get folders inside folders, like categories.",
    refs: ["https://developer.wordpress.org/reference/functions/register_taxonomy/"]
  },
  {
    id: "q-0031",
    s: "Performance", d: 2, level: "Contributor", stage: 3,
    q: "Which is true about get_posts() compared with new WP_Query() with the same arguments?",
    o: [
      "get_posts() always returns every post",
      "get_posts() can't query custom post types",
      "get_posts() sets suppress_filters to true by default, so query filters like posts_where don't run",
      "get_posts() runs the extra pagination count query"
    ],
    a: 2,
    t: "get_posts() defaults suppress_filters to true and forces no_found_rows and ignore_sticky_posts to true. Filters you add won't apply unless you pass suppress_filters => false.",
    p: "It's a quieter shortcut that skips some of the usual hooks, which can surprise you.",
    refs: ["https://developer.wordpress.org/reference/functions/get_posts/"]
  },
  {
    id: "q-0032",
    s: "WordPress Core", d: 2, level: "Contributor", stage: 3,
    q: "After looping through a custom WP_Query in a template, what should you call?",
    o: [
      "wp_reset_query() before the loop",
      "wp_reset_postdata()",
      "wp_cache_flush()",
      "flush_rewrite_rules()"
    ],
    a: 1,
    t: "A custom loop changes the global $post. wp_reset_postdata() restores it to the main query's current post, so later template tags show the right data.",
    p: "Put things back the way you found them after your side trip.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_reset_postdata/"]
  },
  {
    id: "q-0033",
    s: "Performance", d: 2, level: "Author", stage: 1,
    q: "Which WP_Query argument stops WordPress from counting the total number of matching rows, which is useful when you don't need pagination?",
    o: [
      "'cache_results' => false",
      "'fields' => 'ids'",
      "'suppress_filters' => true",
      "'no_found_rows' => true"
    ],
    a: 3,
    t: "'no_found_rows' => true skips the SQL_CALC_FOUND_ROWS count that WordPress only needs to work out pagination, so the query runs faster.",
    p: "If you're not going to show page numbers, don't make the database count every possible result. Just get the few you need.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_query/"]
  },
  {
    id: "q-0034",
    s: "Security", d: 1, level: "Contributor", stage: 1,
    q: "You're printing a user-supplied URL inside an href attribute. Which function should you use?",
    o: ["sanitize_text_field()", "esc_attr()", "esc_url()", "esc_html()"],
    a: 2,
    t: "esc_url() checks the protocol (which blocks javascript: URLs, for example) and encodes the URL for output. esc_attr() doesn't check the protocol.",
    p: "Links get their own safety check, which makes sure they really go to a web address and not to some hidden code.",
    refs: [
      "https://developer.wordpress.org/reference/functions/esc_url/",
      "https://developer.wordpress.org/apis/security/escaping/"
    ]
  },
  {
    id: "q-0035",
    s: "Security", d: 2, level: "Author", stage: 1,
    q: "Since WordPress 5.5, what happens if you call register_rest_route() without a permission_callback?",
    o: [
      "The route is limited to administrators",
      "Every request returns a 401",
      "The route still registers and is public, but WordPress triggers a _doing_it_wrong notice",
      "The route fails to register"
    ],
    a: 2,
    t: "WordPress 5.5 added a _doing_it_wrong notice, but the route still works and anyone can call it. For an intentionally public route, pass '__return_true'.",
    p: "If you forget to say who's allowed in, WordPress complains but leaves the door open to everyone.",
    refs: [
      "https://developer.wordpress.org/reference/functions/register_rest_route/",
      "https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/"
    ]
  },
  {
    id: "q-0036",
    s: "Security", d: 1, level: "Contributor", stage: 1,
    q: "What's the correct way to run a custom SQL query that includes user input?",
    o: [
      "Use $wpdb->prepare() with placeholders such as %s and %d",
      "Run the input through sanitize_text_field() and concatenate it",
      "Concatenate the input after running it through esc_sql()",
      "Cast the whole query string with intval()"
    ],
    a: 0,
    t: "$wpdb->prepare() with typed placeholders is the standard protection against SQL injection.",
    p: "Leave blanks in the database question and let WordPress fill them in safely, so nobody can sneak extra commands in through a form field.",
    refs: ["https://developer.wordpress.org/reference/classes/wpdb/prepare/"]
  },
  {
    id: "q-0037",
    s: "Performance", d: 2, level: "Author", stage: 1,
    q: "On a site with a persistent object cache (Memcached or Redis), where should you store an expensive computed result so it's reused across requests?",
    o: [
      "The PHP $_SESSION",
      "A static PHP variable",
      "wp_cache_set() with a cache group and an expiration",
      "An autoloaded option via update_option()"
    ],
    a: 2,
    t: "A static variable only lasts for one request. With a persistent cache backend, wp_cache_set() keeps the value across requests, and you control its group and expiration.",
    p: "Work it out once and keep the answer in fast shared memory, so the next visitors don't have to wait for it to be worked out again.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_cache_set/",
      "https://developer.wordpress.org/reference/classes/wp_object_cache/"
    ]
  },
  {
    id: "q-0038",
    s: "Performance", d: 1, level: "Contributor", stage: 1,
    q: "Why is 'posts_per_page' => -1 discouraged on high-traffic sites?",
    o: [
      "It ignores post_status",
      "It's deprecated",
      "It disables the object cache",
      "It returns an unbounded result set that can exhaust memory and slow the database as content grows"
    ],
    a: 3,
    t: "Unbounded queries get slower as content grows. Set a sensible limit, or process the posts in batches.",
    p: "'Give me everything' is fine with 50 posts and a disaster with 500,000. Always set a limit.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_query/"]
  },
  {
    id: "q-0039",
    s: "Security", d: 2, level: "Author", stage: 1,
    q: "Which statement about WordPress nonces is correct?",
    o: [
      "They're single-use tokens that expire after one request",
      "They help confirm intent and prevent CSRF, but you still need capability checks",
      "They authenticate the user and can replace capability checks",
      "They encrypt form data"
    ],
    a: 1,
    t: "A nonce confirms the request was intended (CSRF protection), but it doesn't check permission, so always pair it with current_user_can(). WordPress nonces are also time-limited rather than truly single-use.",
    p: "A nonce proves the click came from your own page. It doesn't prove the person is allowed to do what they clicked.",
    refs: ["https://developer.wordpress.org/apis/security/nonces/"]
  },
  {
    id: "q-0040",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 1,
    q: "Two callbacks are attached to the same action, one at priority 5 and one at priority 20. Which runs first?",
    o: ["Priority 5", "Both run at the same time", "Whichever was added first", "Priority 20"],
    a: 0,
    t: "Lower priority numbers run first, and the default is 10. Callbacks with the same priority run in the order they were added.",
    p: "It's a queue with ticket numbers. A lower number gets served first.",
    refs: [
      "https://developer.wordpress.org/reference/functions/add_action/",
      "https://developer.wordpress.org/plugins/hooks/"
    ]
  },
  {
    id: "q-0041",
    s: "WordPress Core", d: 2, level: "Author", stage: 1,
    q: "In block.json (WP 6.1+), which property points to a PHP file used to render a dynamic block on the server?",
    o: ["\"renderCallback\"", "\"viewScript\"", "\"editorScript\"", "\"render\""],
    a: 3,
    t: "\"render\": \"file:./render.php\" tells WordPress to render the block on the server with that file. The PHP file receives $attributes, $content and $block.",
    p: "It tells WordPress which file builds this block's HTML fresh each time a page loads, so it always shows current information.",
    refs: ["https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/"]
  },
  {
    id: "q-0042",
    s: "Custom Development", d: 2, level: "Author", stage: 1,
    q: "In WordPress 6.3+, how do you enqueue a script with the defer loading strategy?",
    o: [
      "Pass array( 'strategy' => 'defer' ) as the 5th argument of wp_enqueue_script()",
      "Add defer to the $src URL",
      "Set $in_footer to 'defer'",
      "Use add_filter( 'script_defer', '__return_true' )"
    ],
    a: 0,
    t: "Since 6.3, the 5th parameter of wp_enqueue_script() accepts an array with 'strategy' ('defer' or 'async') and 'in_footer'.",
    p: "It tells the browser to show the page first and run this script afterwards, so visitors aren't left staring at a blank screen.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_enqueue_script/"]
  },
  {
    id: "q-0043",
    s: "Performance", d: 2, level: "Author", stage: 1,
    q: "You need to filter thousands of posts by a frequently queried attribute (for example, \"Practice Area\"). Which approach scales best?",
    o: [
      "A serialized array in a single option",
      "A meta_query on meta_value",
      "A custom taxonomy",
      "A LIKE search on post_content"
    ],
    a: 2,
    t: "Taxonomy tables are built for this kind of filtering and use indexed joins. meta_value isn't indexed, so meta queries get slow at scale.",
    p: "Categories are like labeled drawers you can open straight away. Custom fields are like checking a sticky note on every single file.",
    refs: ["https://developer.wordpress.org/reference/functions/register_taxonomy/"]
  },
  {
    id: "q-0044",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 1,
    q: "By default, what triggers WP-Cron events?",
    o: [
      "Only admin logins",
      "A dedicated background PHP process",
      "Page requests to the site",
      "The server's system crontab"
    ],
    a: 2,
    t: "Visits to the site trigger WP-Cron. For reliable timing, set DISABLE_WP_CRON and run a real system cron (or the host's equivalent).",
    p: "WordPress only checks its to-do list when someone visits. No visitors means the jobs wait. A real server timer fixes that.",
    refs: ["https://developer.wordpress.org/plugins/cron/"]
  },
  {
    id: "q-0045",
    s: "Performance", d: 2, level: "Author", stage: 1,
    q: "Why can a large number of autoloaded options hurt performance?",
    o: [
      "They're only loaded in wp-admin",
      "They're loaded on every request, which increases memory use and query or cache payload size",
      "They disable the object cache",
      "They're stored in a separate table"
    ],
    a: 1,
    t: "wp_load_alloptions() loads every autoloaded option on each request. If that set gets very large, it can also exceed object-cache size limits.",
    p: "It's like carrying your entire filing cabinet to every meeting just in case. Only bring what you always need.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_load_alloptions/",
      "https://make.wordpress.org/core/2024/06/18/options-api-disabling-autoload-for-large-options/"
    ]
  },
  {
    id: "q-0046",
    s: "Security", d: 3, level: "Editor", stage: 1,
    q: "Which function translates meta capabilities like edit_post into the primitive capabilities a user actually needs?",
    o: ["map_meta_cap()", "get_role()", "user_can()", "add_cap()"],
    a: 0,
    t: "map_meta_cap() turns a meta capability into primitive capabilities, such as edit_others_posts or edit_published_posts, depending on the post and the user.",
    p: "'Can I edit this post?' depends on whose post it is and whether it's published. This function works out which actual permissions that question needs.",
    refs: ["https://developer.wordpress.org/reference/functions/map_meta_cap/"]
  },
  {
    id: "q-0047",
    s: "Custom Development", d: 1, level: "Contributor", stage: 1,
    q: "Which function translates, escapes for HTML and echoes a string?",
    o: ["esc_html__()", "esc_html_e()", "esc_attr__()", "_e()"],
    a: 1,
    t: "Functions ending in _e echo their output, and functions ending in __ return it. _e() echoes but doesn't escape.",
    p: "The 'e' means 'print it now.' This one translates the text, makes it safe, and prints it in one go.",
    refs: ["https://developer.wordpress.org/reference/functions/esc_html_e/"]
  },
  {
    id: "q-0048",
    s: "Custom Development", d: 1, level: "Contributor", stage: 2,
    q: "When should a plugin call flush_rewrite_rules()?",
    o: [
      "On plugin activation and deactivation, or after rewrite rules actually change",
      "On every admin_init",
      "On every init",
      "Inside template_redirect"
    ],
    a: 0,
    t: "Flushing is expensive because it rebuilds and saves the rules. Doing it on every request is a known performance anti-pattern.",
    p: "Reprint the site's address book only when an address actually changes, not every time someone looks something up.",
    refs: ["https://developer.wordpress.org/reference/functions/flush_rewrite_rules/"]
  },
  {
    id: "q-0049",
    s: "WordPress Core", d: 3, level: "Editor", stage: 1,
    q: "Which statement about switch_to_blog() in multisite is true?",
    o: [
      "It only works in WP-CLI",
      "It fully loads the target site's active plugins and theme",
      "It switches database context but doesn't load the target site's plugins or theme, and you should call restore_current_blog() afterward",
      "It permanently changes the current site for the request"
    ],
    a: 2,
    t: "It only switches tables and cache context. Hooks, post types and taxonomies registered by the target site's plugins aren't available.",
    p: "You can peek into another site's filing cabinet, but its staff (plugins and theme) don't come along. Close the drawer when you're done.",
    refs: [
      "https://developer.wordpress.org/reference/functions/switch_to_blog/",
      "https://developer.wordpress.org/reference/functions/restore_current_blog/"
    ]
  },
  {
    id: "q-0050",
    s: "Performance", d: 1, level: "Contributor", stage: 2,
    q: "What's the best practice for making a remote HTTP request during a front-end page load?",
    o: [
      "Use curl_exec() directly so you skip the HTTP API overhead",
      "Use file_get_contents() with no timeout",
      "Use a short timeout, handle failures, and cache the response",
      "Use the default HTTP API settings and request on every page view"
    ],
    a: 2,
    t: "A slow or failing third-party service shouldn't take your page down with it. Use the WordPress HTTP API with a short timeout, handle WP_Error, and cache the result.",
    p: "Don't make visitors wait on someone else's slow website. Ask once, keep the answer, and don't hang around if they don't reply.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_remote_get/",
      "https://developer.wordpress.org/plugins/http-api/"
    ]
  },
  {
    id: "q-0051",
    s: "Security", d: 2, level: "Author", stage: 1,
    q: "A settings field takes plain text that must keep line breaks but contain no HTML. Which function should you use to sanitize it before saving?",
    o: ["sanitize_text_field()", "wp_kses_post()", "esc_textarea()", "sanitize_textarea_field()"],
    a: 3,
    t: "sanitize_textarea_field() keeps line breaks, while sanitize_text_field() removes them. esc_textarea() is for output, and wp_kses_post() allows HTML.",
    p: "It's the cleaner made for multi-line text boxes. It strips out code but keeps your paragraphs.",
    refs: ["https://developer.wordpress.org/reference/functions/sanitize_textarea_field/"]
  },
  {
    id: "q-0052",
    s: "WordPress Core", d: 2, level: "Author", stage: 1,
    q: "For a custom post meta field to be readable and editable in the block editor (for example, with useEntityProp), what must register_post_meta() include?",
    o: ["'single' => false", "'show_in_rest' => true", "'public' => true", "'autoload' => true"],
    a: 1,
    t: "The block editor reads and saves data through the REST API, so the meta has to be exposed there. The post type also needs to support 'custom-fields'.",
    p: "The editor talks to WordPress through the REST API. If a field isn't shared there, the editor can't see it.",
    refs: ["https://developer.wordpress.org/reference/functions/register_post_meta/"]
  },
  {
    id: "q-0053",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 2,
    q: "What is the key functional difference between an action callback and a filter callback?",
    o: [
      "Filters can only be used in themes",
      "Actions accept arguments, filters don't",
      "Actions run before filters on every hook",
      "A filter callback must return a value (usually the modified input); an action callback performs side effects and its return value is ignored"
    ],
    a: 3,
    t: "apply_filters() passes a value through each callback and uses what it returns. If a filter callback forgets to return, the value becomes null. do_action() ignores return values, so actions are for side effects like sending an email or registering something.",
    p: "A filter is a pass-through. Something goes in, you can tweak it, and you must hand it back. An action is a trigger: 'this just happened, do something about it.' Nothing gets handed back.",
    refs: ["https://developer.wordpress.org/plugins/hooks/"]
  },
  {
    id: "q-0054",
    s: "WordPress Core", d: 2, level: "Author", stage: 1,
    q: "An external script (not a browser) needs to create posts through the core REST API. No extra plugins are installed. Which built-in authentication method fits?",
    o: [
      "Application Passwords over HTTPS using HTTP Basic Auth",
      "Passing the admin username and password as GET parameters",
      "Cookie authentication with a wp_rest nonce",
      "The REST API needs no authentication to create posts"
    ],
    a: 0,
    t: "Application Passwords (core since 5.6) give each external integration its own revocable credential, sent as a Basic Auth header over HTTPS. Cookie auth is meant for logged-in browser sessions and needs a nonce. Credentials in the query string end up in server logs.",
    p: "Give the script its own spare key that you can cancel any time, instead of handing over your main password.",
    refs: ["https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/"]
  },
  {
    id: "q-0055",
    s: "WordPress Core", d: 3, level: "Editor", stage: 1,
    q: "Your theme's JavaScript calls a custom REST endpoint for a logged-in user, but WordPress treats the request as logged out. What's the most likely cause?",
    o: [
      "REST requests can never use cookies",
      "The permalink structure is set to 'Plain'",
      "The user lacks the manage_options capability",
      "The request isn't sending a wp_rest nonce in the X-WP-Nonce header"
    ],
    a: 3,
    t: "For cookie authentication, the REST API needs a nonce created with wp_create_nonce('wp_rest') and sent as X-WP-Nonce, or the _wpnonce parameter. Without it, core deliberately sets the current user to 0. This is a CSRF protection.",
    p: "Being logged in isn't enough. The request also has to carry a fresh permission slip that proves your own page sent it, not some other website.",
    refs: ["https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/"]
  },
  {
    id: "q-0056",
    s: "WordPress Core", d: 2, level: "Author", stage: 1,
    q: "On a single site with no persistent object cache, where does set_transient() store its data?",
    o: [
      "In the wp_options table, as _transient_ and _transient_timeout_ rows",
      "In PHP memory only, for the current request",
      "In the wp_postmeta table",
      "In a file inside wp-content/cache"
    ],
    a: 0,
    t: "Without an object-cache drop-in, transients are saved in wp_options with a matching timeout row. Once a persistent object cache is installed, they go there and skip the database. On multisite, set_site_transient() uses the network-wide sitemeta table instead.",
    p: "With no fast memory store installed, WordPress parks the temporary data in its main settings table, alongside a note saying when it expires.",
    refs: ["https://developer.wordpress.org/apis/transients/"]
  },
  {
    id: "q-0057",
    s: "WordPress Core", d: 2, level: "Author", stage: 1,
    q: "You set a transient with a 12-hour expiration. What should your code assume when it calls get_transient()?",
    o: [
      "It returns null after expiry",
      "It throws an exception if the value is missing",
      "The value is guaranteed to exist for the full 12 hours",
      "The value can disappear at any time, so always handle false and regenerate it"
    ],
    a: 3,
    t: "The expiration is a maximum lifetime, not a promise. Cache eviction, flushes, or memory pressure in Redis or Memcached can remove the value early. Treat a false return as a cache miss, rebuild the value, and set it again.",
    p: "Think of a sticky note that says 'good until tonight.' Someone might throw it away earlier, so always be ready to write a new one.",
    refs: [
      "https://developer.wordpress.org/apis/transients/",
      "https://developer.wordpress.org/reference/functions/get_transient/"
    ]
  },
  {
    id: "q-0058",
    s: "WordPress Core", d: 2, level: "Author", stage: 1,
    q: "How do you avoid scheduling duplicate recurring WP-Cron events?",
    o: [
      "Check wp_next_scheduled( $hook ) and only call wp_schedule_event() if it returns false, ideally on activation",
      "Use a PHP session flag",
      "Call wp_clear_scheduled_hook() on every page load, then reschedule",
      "Call wp_schedule_event() on every init"
    ],
    a: 0,
    t: "wp_next_scheduled() returns a timestamp if the event already exists. Schedule on plugin activation, or guard the call with that check, and unschedule on deactivation. Clearing and rescheduling on every request writes to the cron option constantly.",
    p: "Before you add an alarm, check whether one is already set. Otherwise you end up with five alarms going off for the same thing.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_next_scheduled/",
      "https://developer.wordpress.org/reference/functions/wp_schedule_event/"
    ]
  },
  {
    id: "q-0059",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 2,
    q: "With the Settings API, where should you sanitize a setting's value before it's saved?",
    o: [
      "You don't need to; options.php sanitizes everything automatically",
      "In the sanitize_callback passed to register_setting()",
      "In the field's HTML render callback",
      "In JavaScript before the form is submitted"
    ],
    a: 1,
    t: "register_setting( $group, $name, array( 'sanitize_callback' => ... ) ) runs on the server whenever the option is updated. Render callbacks only produce output, and you escape there. Client-side checks are easy to bypass.",
    p: "Check what comes in at the front door, on the server, because the browser can be tricked. The display code is for showing things safely, not for checking them.",
    refs: ["https://developer.wordpress.org/reference/functions/register_setting/"]
  },
  {
    id: "q-0060",
    s: "WordPress Core", d: 2, level: "Author", stage: 2,
    q: "In a classic theme, a single post of the custom post type 'book' with the slug 'my-book' is requested. Which template file does WordPress look for first?",
    o: ["book.php", "single-book.php", "single-book-my-book.php", "singular.php"],
    a: 2,
    t: "The order is single-{post_type}-{slug}.php, then single-{post_type}.php, single.php, singular.php, and finally index.php. The slug-specific level was added in WordPress 4.4.",
    p: "WordPress starts with the most specific template it could use and works down to the most general fallback.",
    refs: ["https://developer.wordpress.org/themes/classic-themes/basics/template-hierarchy/"]
  },
  {
    id: "q-0061",
    s: "WordPress Core", d: 2, level: "Author", stage: 2,
    q: "What's the recommended way to change how many posts the main blog archive shows?",
    o: [
      "Run a second WP_Query and ignore the main one",
      "Edit wp-includes/query.php",
      "Call query_posts() in the template",
      "Hook pre_get_posts and modify the query when $query->is_main_query() and ! is_admin()"
    ],
    a: 3,
    t: "query_posts() throws away the main query and runs a new one, which wastes a query and breaks pagination and conditional tags. pre_get_posts changes the main query before it runs, so it's still a single query.",
    p: "Change the order before the kitchen starts cooking, rather than cooking a meal, binning it, and cooking another.",
    refs: ["https://developer.wordpress.org/reference/hooks/pre_get_posts/"]
  },
  {
    id: "q-0062",
    s: "WordPress Core", d: 2, level: "Author", stage: 2,
    q: "How does WordPress store an uploaded image in the database?",
    o: [
      "In a dedicated wp_media table",
      "As a post with post_type 'attachment', with file details such as dimensions and sizes in post meta (_wp_attachment_metadata)",
      "As an option in wp_options",
      "Only as a file. Nothing goes in the database."
    ],
    a: 1,
    t: "Attachments are rows in wp_posts. The relative file path is stored in _wp_attached_file, and intermediate image sizes, dimensions and EXIF data are in _wp_attachment_metadata.",
    p: "Each upload gets a 'post' record like an article does, plus a fact sheet listing its sizes and other details.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_get_attachment_metadata/"]
  },
  {
    id: "q-0063",
    s: "WordPress Core", d: 3, level: "Editor", stage: 1,
    q: "Which describes how the Interactivity API adds front-end behavior to blocks?",
    o: [
      "Server-rendered HTML uses data-wp-* directives connected to a store defined with @wordpress/interactivity",
      "It requires React to be loaded on the front end",
      "It replaces PHP rendering with client-only rendering",
      "It only works inside the block editor"
    ],
    a: 0,
    t: "The server renders the markup and initial state, for example with wp_interactivity_state(). Directives such as data-wp-interactive, data-wp-on--click and data-wp-bind hook that markup up to a small reactive store, with no heavy framework on the page.",
    p: "The page arrives complete and fast, with small labels on the elements that say 'when clicked, do this.' A lightweight script then brings those parts to life.",
    refs: ["https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/"]
  },
  {
    id: "q-0064",
    s: "WordPress Core", d: 2, level: "Author", stage: 2,
    q: "When should a plugin call add_role() to create a custom role?",
    o: [
      "On every admin page load",
      "In the theme's functions.php",
      "On every init",
      "On plugin activation, because roles are saved to the database"
    ],
    a: 3,
    t: "Roles and capabilities are stored in the {prefix}user_roles option. Calling add_role() on every request does needless database work. Add the role on activation and remove it on uninstall, or deactivation if appropriate.",
    p: "You create a new job title once, when the plugin is set up, not every time someone visits the site.",
    refs: ["https://developer.wordpress.org/reference/functions/add_role/"]
  },
  {
    id: "q-0065",
    s: "Security", d: 3, level: "Editor", stage: 1,
    q: "You need to pass a PHP array (including user-generated strings) to a front-end script. Which approach is safest?",
    o: [
      "Output it with serialize()",
      "Echo it inside a <script> tag using esc_html()",
      "Wrap it in esc_url()",
      "Use wp_add_inline_script() with the data encoded by wp_json_encode()"
    ],
    a: 3,
    t: "Escaping depends on where the value ends up. Inside JavaScript, JSON encoding produces a valid, safely quoted literal. esc_html() is for HTML text, not script content. Attaching the data with wp_add_inline_script() ties it to the script handle that uses it.",
    p: "Each destination has its own safety wrapping. Data going into JavaScript should be packed as JSON, which JavaScript understands and can't mistake for code.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_add_inline_script/",
      "https://developer.wordpress.org/reference/functions/wp_json_encode/"
    ]
  },
  {
    id: "q-0066",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "What should a wp_ajax_ handler that deletes data do first?",
    o: [
      "Check that $_POST is not empty",
      "Verify the nonce with check_ajax_referer() and check permission with current_user_can()",
      "Nothing, because admin-ajax.php is already protected",
      "Check is_admin() only"
    ],
    a: 1,
    t: "check_ajax_referer() stops CSRF and dies with -1 or a 403 by default if it fails. current_user_can() is the authorization check. is_admin() returns true for every admin-ajax.php request, even from logged-out users, so it proves nothing.",
    p: "Two questions every time: did this request really come from our own page, and is this person allowed to do it?",
    refs: [
      "https://developer.wordpress.org/reference/functions/check_ajax_referer/",
      "https://developer.wordpress.org/reference/functions/current_user_can/"
    ]
  },
  {
    id: "q-0067",
    s: "Security", d: 1, level: "Contributor", stage: 2,
    q: "Which hook registers an admin-ajax.php handler for logged-out visitors?",
    o: ["wp_ajax_nopriv_{action}", "admin_post_{action}", "wp_ajax_{action}", "rest_api_init"],
    a: 0,
    t: "wp_ajax_{action} only fires for logged-in users and wp_ajax_nopriv_{action} for logged-out ones. Anything registered on nopriv is open to the whole internet, so validate input and rate-limit it.",
    p: "'nopriv' means 'no account needed.' That's handy, but it also means anyone in the world can call it.",
    refs: ["https://developer.wordpress.org/reference/hooks/wp_ajax_nopriv_action/"]
  },
  {
    id: "q-0068",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "You want to disable the plugin and theme file editors in wp-admin but still let admins install and update plugins. Which constant do you set?",
    o: [
      "define( 'WP_DEBUG', false );",
      "define( 'DISALLOW_FILE_EDIT', true );",
      "define( 'DISALLOW_FILE_MODS', true );",
      "define( 'FORCE_SSL_ADMIN', true );"
    ],
    a: 1,
    t: "DISALLOW_FILE_EDIT only removes the built-in code editors. DISALLOW_FILE_MODS goes further and also blocks installs and updates, which you usually only want when deployments go through Git or CI.",
    p: "Take away the 'edit code in the browser' button. If a hacker gets into an admin account, they can't quietly paste malicious code.",
    refs: ["https://developer.wordpress.org/advanced-administration/wordpress/wp-config/"]
  },
  {
    id: "q-0069",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "Why is xmlrpc.php often blocked or restricted when it isn't needed?",
    o: [
      "It exposes the database password",
      "system.multicall lets attackers try many passwords in one request, and pingbacks can be abused for DDoS",
      "It disables the REST API",
      "It slows down the block editor"
    ],
    a: 1,
    t: "Through XML-RPC, system.multicall can bundle hundreds of login attempts into one HTTP request, which gets around simple per-request login limits. The pingback.ping method can also be used to make the site attack others. Block it at the server or with the xmlrpc_enabled filter if nothing depends on it.",
    p: "It's an old side door that lets attackers try hundreds of keys in a single knock. If nobody uses it, lock it.",
    refs: ["https://developer.wordpress.org/advanced-administration/security/brute-force/"]
  },
  {
    id: "q-0070",
    s: "Security", d: 3, level: "Editor", stage: 1,
    q: "Which core HTTP function rejects URLs that point to local or private addresses, which helps prevent SSRF?",
    o: ["wp_remote_get()", "file_get_contents()", "wp_safe_remote_get()", "download_url() with no arguments"],
    a: 2,
    t: "The wp_safe_remote_*() functions set reject_unsafe_urls, which runs wp_http_validate_url() to block disallowed ports and local or private hosts. For user-supplied URLs, also restrict requests to an approved list of domains.",
    p: "The 'safe' version refuses to fetch addresses that point back inside your own network, so attackers can't use your server to snoop around.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_safe_remote_get/"]
  },
  {
    id: "q-0071",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "A plugin fetches any URL a user submits so it can generate a link preview. What's the main security risk?",
    o: [
      "CSRF on the login form",
      "SQL injection",
      "Server-Side Request Forgery (SSRF): the server can be made to request internal services such as 169.254.169.254 cloud metadata",
      "Clickjacking"
    ],
    a: 2,
    t: "With SSRF, an attacker picks where your server sends requests. That can reach internal admin panels, databases, or cloud metadata endpoints that leak credentials. Defenses include validating the URL scheme and host, blocking private IP ranges (after DNS resolution too), and allowing only approved domains.",
    p: "The attacker gets your server to make calls on their behalf, to places they can't reach from outside but your server can.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_safe_remote_get/",
      "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html"
    ]
  },
  {
    id: "q-0072",
    s: "Security", d: 3, level: "Editor", stage: 2,
    q: "What's the correct way to build a LIKE search from user input with $wpdb?",
    o: [
      "$wpdb->prepare( \"... LIKE %s\", '%' . $wpdb->esc_like( $term ) . '%' )",
      "\"... LIKE '%\" . $term . \"%'\"",
      "\"... LIKE '%\" . esc_html( $term ) . \"%'\"",
      "\"... LIKE '%\" . sanitize_text_field( $term ) . \"%'\""
    ],
    a: 0,
    t: "esc_like() escapes the wildcard characters % and _ inside the user's term, so they're treated as literal text. prepare() then quotes and escapes the whole value for SQL. You need both.",
    p: "Clean the search words so they can't act as wildcards, then let WordPress seal them safely into the query.",
    refs: [
      "https://developer.wordpress.org/reference/classes/wpdb/esc_like/",
      "https://developer.wordpress.org/reference/classes/wpdb/prepare/"
    ]
  },
  {
    id: "q-0073",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "Your archive page accepts an orderby value from the URL and passes it to WP_Query. What's the best defense?",
    o: [
      "Use base64_decode() on it",
      "Trust WP_Query to sanitize it",
      "Validate it against an allowlist of permitted values and fall back to a default",
      "Run it through esc_html()"
    ],
    a: 2,
    t: "When the set of valid values is small, compare against it exactly, for example in_array( $value, $allowed, true ). That stops odd sorting, expensive meta_value sorts and injection through query arguments. Escaping functions are for output, not for validating input.",
    p: "Only accept answers from a short menu you wrote yourself. Anything else gets the default.",
    refs: ["https://developer.wordpress.org/apis/security/data-validation/"]
  },
  {
    id: "q-0074",
    s: "Security", d: 3, level: "Editor", stage: 2,
    q: "You want a custom post type 'book' to have its own capabilities (edit_books, edit_others_books, and so on) with per-post checks that work. What do you pass to register_post_type()?",
    o: [
      "'capability_type' => 'book' and 'map_meta_cap' => true",
      "'show_in_rest' => true",
      "'public' => false",
      "'hierarchical' => true"
    ],
    a: 0,
    t: "capability_type generates the capability names, and map_meta_cap => true makes core translate checks like current_user_can( 'edit_post', $id ) into the right primitive capabilities based on authorship and status. You then grant those capabilities only to the roles that need them.",
    p: "Give books their own set of keys, and let WordPress work out for each book whether this person's key fits.",
    refs: [
      "https://developer.wordpress.org/reference/functions/register_post_type/",
      "https://developer.wordpress.org/reference/functions/map_meta_cap/"
    ]
  },
  {
    id: "q-0075",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "Which tool, run in CI, would flag output that isn't escaped (for example, echo $var;) in a plugin?",
    o: ["Xdebug", "wp-cli doctor", "PHPUnit", "PHPCS with the WordPress Coding Standards ruleset"],
    a: 3,
    t: "WPCS includes security sniffs such as WordPress.Security.EscapeOutput, NonceVerification and ValidatedSanitizedInput, plus a prepared-SQL sniff. Running PHPCS in CI blocks those patterns before merge. PHPStan adds type-level analysis on top.",
    p: "It's an automatic proofreader for code that circles every place where something unsafe might be printed to the page.",
    refs: ["https://github.com/WordPress/WordPress-Coding-Standards"]
  },
  {
    id: "q-0076",
    s: "Security", d: 1, level: "Contributor", stage: 2,
    q: "When building an audit log of authentication events, which of these should NEVER be written to the log?",
    o: [
      "The timestamp and IP address",
      "The submitted password, even for failed attempts",
      "Role changes and who made them",
      "The username for failed logins"
    ],
    a: 1,
    t: "Logs are often less protected than the database and get sent to third-party tools. A failed attempt's password is often a typo of the real one. Log who, when, from where and the outcome, but never secrets.",
    p: "Note who tried the door and when, but never write down the key they used.",
    refs: ["https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html"]
  },
  {
    id: "q-0077",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "You need the 5 latest posts excluding the current one. On a large site, what's the most performant approach?",
    o: [
      "Use 'post__not_in' => array( $current_id )",
      "Use a meta_query with 'compare' => '!='",
      "Query 6 posts and skip the current one in PHP",
      "Use 'posts_per_page' => -1 and filter the results"
    ],
    a: 2,
    t: "post__not_in produces SQL NOT IN, which makes caching harder (every page gets a different query) and can push MySQL towards less efficient plans. Fetching one extra post and skipping it in PHP keeps the query simple and identical across pages, so it caches well.",
    p: "Rather than asking the database for 'everything except that one,' ask for one extra and quietly leave out the one you don't need.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_query/"]
  },
  {
    id: "q-0078",
    s: "Performance", d: 2, level: "Author", stage: 2,
    q: "Why is a meta query with LIKE '%term%' slow on large tables?",
    o: [
      "A leading wildcard stops MySQL from using an index, so it has to scan every row",
      "LIKE is deprecated in MySQL 8",
      "It disables the query cache for the whole site",
      "It locks the table"
    ],
    a: 0,
    t: "B-tree indexes can only match from the start of a value. 'term%' can use an index, but '%term%' can't, which forces a full scan. meta_value isn't usefully indexed by default anyway. Use exact key and value matches, taxonomies, or offload the search to something like Elasticsearch.",
    p: "It's like finding every word that contains 'cat' in a dictionary. Alphabetical order doesn't help, so you have to read every page.",
    refs: ["https://dev.mysql.com/doc/refman/8.0/en/index-btree-hash.html"]
  },
  {
    id: "q-0079",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "EXPLAIN on a slow query shows type: ALL and Extra: Using filesort. What does that mean?",
    o: [
      "The query uses the primary key optimally",
      "The query is fully cached",
      "MySQL is doing a full table scan and then sorting the rows without an index",
      "The table uses MyISAM"
    ],
    a: 2,
    t: "type ALL means every row is read. Using filesort means the results are sorted in a separate pass, possibly on disk, instead of being read in index order. The usual fix is an index that covers the WHERE and ORDER BY columns, or rewriting the query.",
    p: "The database is reading the whole phone book and then sorting it by hand, because nothing was already in a useful order.",
    refs: ["https://dev.mysql.com/doc/refman/8.0/en/explain-output.html"]
  },
  {
    id: "q-0080",
    s: "Performance", d: 2, level: "Author", stage: 2,
    q: "By default, without any drop-in, how does the WordPress object cache (wp_cache_*) behave?",
    o: [
      "It persists to Redis automatically",
      "It writes to files in wp-content/cache",
      "It's non-persistent: data only lasts for the current request unless you add an object-cache.php drop-in for Redis or Memcached",
      "It stores data in the wp_options table"
    ],
    a: 2,
    t: "Core's WP_Object_Cache is an in-memory array that's thrown away at the end of each request. A wp-content/object-cache.php drop-in replaces it with a persistent backend, so cached queries, options and transients survive between requests.",
    p: "Out of the box, WordPress has a notepad it throws away after every page view. Add Redis or Memcached and it gets a whiteboard that stays up.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_object_cache/"]
  },
  {
    id: "q-0081",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "Which of these core functions is a known 'uncached' function that queries the database on every call?",
    o: ["get_the_title()", "attachment_url_to_postid()", "get_post_meta()", "get_option()"],
    a: 1,
    t: "attachment_url_to_postid() runs a meta query on _wp_attached_file with no object caching, so calling it in a loop multiplies the queries. url_to_postid() and count_user_posts() are other common examples. Wrap them with wp_cache_get() and wp_cache_set() yourself, which is what VIP's helper functions do. Options, post meta and posts are primed into the object cache by core.",
    p: "Most WordPress lookups remember their answers. This one asks the database again every single time unless you add a memory for it.",
    refs: ["https://developer.wordpress.org/reference/functions/attachment_url_to_postid/"]
  },
  {
    id: "q-0082",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "What is the shutdown action typically used for in performance work?",
    o: [
      "Speeding up the main WP_Query",
      "Running code before plugins load",
      "Sending the HTML headers",
      "Deferring non-critical work, such as logging or cleanup, to the very end of the request"
    ],
    a: 3,
    t: "shutdown fires as PHP finishes executing, after the page has been generated. Under PHP-FPM, calling fastcgi_finish_request() first sends the response to the user before slow work runs. Without it, the connection may stay open. Truly heavy work belongs in a queue or cron job.",
    p: "Serve the customer first, then do the paperwork after they've left.",
    refs: ["https://developer.wordpress.org/reference/hooks/shutdown/"]
  },
  {
    id: "q-0083",
    s: "Performance", d: 2, level: "Author", stage: 2,
    q: "A post is updated on a site behind a full-page cache or CDN. What's the best invalidation strategy?",
    o: [
      "Purge only the affected URLs, such as the post, home page, relevant archives and feeds",
      "Never purge, and set a 1-year TTL",
      "Purge the entire cache on every save",
      "Disable the cache for logged-out users"
    ],
    a: 0,
    t: "Targeted purges keep the hit rate high and avoid a 'thundering herd' of requests hitting the origin after a full flush. Many hosts and CDN plugins hook into transition_post_status or save_post to work out which URLs are affected.",
    p: "When one menu item changes, reprint that page of the menu, not every menu in the restaurant.",
    refs: ["https://developer.wordpress.org/advanced-administration/performance/cache/"]
  },
  {
    id: "q-0084",
    s: "Scalability", d: 2, level: "Author", stage: 3,
    q: "What does Cache-Control: max-age=60, stale-while-revalidate=300 tell a CDN?",
    o: [
      "Only cache it for logged-in users",
      "Cache it for 360s and then delete it permanently",
      "Never cache the response",
      "Treat it as fresh for 60s. For up to another 300s, serve the stale copy immediately while fetching a fresh one in the background."
    ],
    a: 3,
    t: "stale-while-revalidate hides the cost of refreshing from users. The first request after the copy goes stale still gets an instant response while the CDN revalidates with the origin asynchronously.",
    p: "The copy is fresh for a minute. After that, visitors still get it instantly while a new one is quietly fetched in the background.",
    refs: [
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control",
      "https://www.rfc-editor.org/rfc/rfc5861"
    ]
  },
  {
    id: "q-0085",
    s: "Scalability", d: 2, level: "Author", stage: 3,
    q: "When is offloading queries to Elasticsearch or OpenSearch most justified?",
    o: [
      "For loading site options",
      "For fetching a single post by ID",
      "For relevance-ranked full-text search, faceted filtering or fuzzy matching across large datasets",
      "For simple 10-post archive pages"
    ],
    a: 2,
    t: "MySQL handles primary-key and indexed lookups well, but struggles with relevance scoring, facets and many meta or taxonomy filters at scale. A search engine indexes the content (for example through ElasticPress) and answers those queries far more efficiently.",
    p: "The database is a great filing cabinet. For 'find me anything like this, sorted by best match,' you want a dedicated search engine.",
    refs: ["https://docs.wpvip.com/enterprise-search/"]
  },
  {
    id: "q-0086",
    s: "Scalability", d: 2, level: "Author", stage: 3,
    q: "Before scaling horizontally by adding more web servers behind a load balancer, what must be solved?",
    o: [
      "Raising PHP memory_limit",
      "Switching every table to MyISAM",
      "Disabling the REST API",
      "Making the application stateless: uploads and sessions can't live only on one server's local disk, and the object cache must be shared"
    ],
    a: 3,
    t: "Any request can land on any server. Media needs shared or object storage, cache and session state must be centralized (or not used, which is why PHP sessions are discouraged), and deploys must keep code identical on every node.",
    p: "If you open more checkout lanes, every cashier needs the same price list and stock room. Otherwise customers get different answers depending on which lane they pick.",
    refs: ["https://developer.wordpress.org/advanced-administration/performance/cache/"]
  },
  {
    id: "q-0087",
    s: "Scalability", d: 2, level: "Author", stage: 3,
    q: "A sidebar widget runs 3 heavy queries on every page view, and its output only changes when posts are published. What's the best caching layer for it?",
    o: [
      "Autoload it as an option",
      "Cache it in the browser's localStorage",
      "A PHP session",
      "Cache the rendered HTML fragment in the object cache, and invalidate it on publish"
    ],
    a: 3,
    t: "Fragment caching stores the finished HTML so the queries and rendering are skipped completely. Key it on anything that changes the output, and clear it on save_post or transition_post_status. It also helps logged-in users who skip the full-page cache.",
    p: "Make the widget once, keep a ready-made copy, and only rebuild it when something new is published.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_cache_set/",
      "https://developer.wordpress.org/advanced-administration/performance/cache/"
    ]
  },
  {
    id: "q-0088",
    s: "Scalability", d: 2, level: "Author", stage: 3,
    q: "A plugin records every page visit as a new post meta row. Traffic is millions of views a month. What's the better design?",
    o: [
      "Store the visits in one serialized option",
      "Keep using post meta, but add more RAM",
      "Store the visits in transients",
      "Write to a custom table designed for it, or send the data to an external analytics service or queue"
    ],
    a: 3,
    t: "wp_postmeta is a generic key-value table. High-volume writes bloat it, slow down every meta join and cause lock contention. A purpose-built table with the right indexes, or offloading writes to a separate service, keeps the main content tables lean.",
    p: "Don't use the company's main filing cabinet as a visitor log. Give it its own notebook, or hand it to a service built for counting.",
    refs: ["https://developer.wordpress.org/plugins/creating-tables-with-plugins/"]
  },
  {
    id: "q-0089",
    s: "Debugging", d: 2, level: "Author", stage: 3,
    q: "You need to capture PHP errors on a live production site. Which configuration is safest?",
    o: [
      "WP_DEBUG true and WP_DEBUG_DISPLAY true",
      "Leave the default wp-content/debug.log publicly reachable",
      "WP_DEBUG_LOG writing to a path outside the web root, with WP_DEBUG_DISPLAY false",
      "display_errors = On in php.ini"
    ],
    a: 2,
    t: "Showing errors leaks file paths and internals to visitors. WP_DEBUG_LOG accepts a file path (since 5.1), so the log can live somewhere the web server won't serve. The default wp-content/debug.log is often reachable by URL.",
    p: "Write problems in a private diary, not on a billboard on the front page.",
    refs: ["https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/"]
  },
  {
    id: "q-0090",
    s: "Debugging", d: 1, level: "Contributor", stage: 3,
    q: "Which WP-CLI command lists scheduled cron events and when they're next due?",
    o: ["wp cron event list", "wp schedule show", "wp option get cron --list", "wp cron list"],
    a: 0,
    t: "wp cron event list shows each hook, its next run time and its recurrence. wp cron event run <hook> triggers one manually, and wp cron test checks that spawning works. The raw data lives in the 'cron' option.",
    p: "It's the command that shows the site's to-do list of scheduled jobs and when each one is due.",
    refs: ["https://developer.wordpress.org/cli/commands/cron/event/list/"]
  },
  {
    id: "q-0091",
    s: "Debugging", d: 1, level: "Contributor", stage: 3,
    q: "A page is slow. How do you find out which plugin is responsible for the slow database queries and outbound HTTP calls?",
    o: [
      "Query Monitor's Queries by Component and HTTP API Calls panels",
      "The browser's Elements panel",
      "Site Health's Info tab",
      "phpinfo()"
    ],
    a: 0,
    t: "Query Monitor groups queries by the plugin or theme that triggered them, flags duplicate and slow queries, and lists every wp_remote_*() call with its timing and response. It also shows hooks, conditionals and enqueued assets.",
    p: "It's a dashboard that points straight at which add-on is making the database and outside services wait.",
    refs: ["https://wordpress.org/plugins/query-monitor/"]
  },
  {
    id: "q-0092",
    s: "Debugging", d: 2, level: "Author", stage: 3,
    q: "Users report ERR_TOO_MANY_REDIRECTS. Which command shows each hop and its Location header?",
    o: ["ping example.com", "curl -sIL https://example.com/page", "wp rewrite flush", "dig example.com"],
    a: 1,
    t: "-I asks for headers only, and -L follows redirects, printing each response's status and Location. That shows whether WordPress (siteurl/home, an HTTP vs HTTPS mismatch behind a proxy), a plugin, or the server or CDN is causing the loop.",
    p: "It follows the trail of signposts one by one, so you can see exactly where it goes round in a circle.",
    refs: ["https://curl.se/docs/manpage.html"]
  },
  {
    id: "q-0093",
    s: "Debugging", d: 1, level: "Contributor", stage: 3,
    q: "You've migrated a site to a new server and want to test it on the real domain before changing DNS. What do you do?",
    o: [
      "Change the DNS and hope it works",
      "Edit siteurl to the server's IP address",
      "Use a URL shortener",
      "Add an entry to your local hosts file that maps the domain to the new server's IP"
    ],
    a: 3,
    t: "/etc/hosts on macOS and Linux, or C:\\Windows\\System32\\drivers\\etc\\hosts on Windows, overrides DNS for your machine only. You browse the new server with the real hostname, including SSL and cookies, while everyone else still reaches the old server.",
    p: "You tell only your own computer 'this address lives over here now,' so you can test it before moving it for everyone.",
    refs: ["https://en.wikipedia.org/wiki/Hosts_(file)"]
  },
  {
    id: "q-0094",
    s: "Change Management", d: 2, level: "Author", stage: 3,
    q: "A test boots WordPress with a test database, publishes a post, and checks that your plugin saved the expected post meta. What kind of test is it?",
    o: ["A unit test", "A load test", "An integration test", "A user acceptance test"],
    a: 2,
    t: "It exercises your code together with real WordPress hooks and the database, so it's an integration test, usually built on WP_UnitTestCase despite the name. A unit test isolates a single function and mocks its dependencies. UAT checks business workflows from the user's point of view.",
    p: "You're not testing one part alone. You're checking that your part works properly once it's plugged into the real machine.",
    refs: ["https://make.wordpress.org/core/handbook/testing/automated-testing/phpunit/"]
  },
  {
    id: "q-0095",
    s: "Change Management", d: 1, level: "Contributor", stage: 3,
    q: "Your plugin is at 2.3.1. You remove a public function that other plugins call. Under semantic versioning, what should the next version be?",
    o: ["2.4.0", "3.0.0", "2.3.1-b", "2.3.2"],
    a: 1,
    t: "Semver is MAJOR.MINOR.PATCH. Backward-incompatible changes bump MAJOR, new compatible features bump MINOR, and compatible bug fixes bump PATCH. Removing a public API breaks compatibility, so it goes to 3.0.0.",
    p: "The first number is a warning sign meaning 'this could break things that depend on me.'",
    refs: ["https://semver.org/"]
  },
  {
    id: "q-0096",
    s: "Change Management", d: 2, level: "Author", stage: 3,
    q: "Which deployment approach gives zero-downtime, atomic releases?",
    o: [
      "Build the release in a new directory, then switch a 'current' symlink to it in one step, keeping earlier releases for rollback",
      "Edit files live with the theme editor",
      "Run git pull on production during peak traffic",
      "FTP each changed file onto the live directory"
    ],
    a: 0,
    t: "Switching the symlink is effectively instant, so no request ever sees half-updated code. Rolling back means pointing the symlink at the previous release. Shared directories such as uploads are linked into each release.",
    p: "Set up the new stage completely backstage, then flip one switch to show it. If something's wrong, flip it back.",
    refs: ["https://deployer.org/blog/atomic-symlinks"]
  },
  {
    id: "q-0097",
    s: "Change Management", d: 2, level: "Author", stage: 3,
    q: "Which core function lets plugin code behave differently on production, staging and local environments?",
    o: [
      "get_bloginfo( 'version' )",
      "wp_get_environment_type(), driven by the WP_ENVIRONMENT_TYPE constant or environment variable",
      "is_multisite()",
      "is_admin()"
    ],
    a: 1,
    t: "Added in 5.5, it returns 'local', 'development', 'staging' or 'production', with production as the default. Use it to turn off things like outbound emails, payment gateways or search indexing outside production. Keep secrets in environment variables, not in code.",
    p: "The site can ask 'am I the real one or a practice copy?' and act accordingly, so test sites don't email real customers.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_get_environment_type/"]
  },
  {
    id: "q-0098",
    s: "Disaster Recovery", d: 2, level: "Author", stage: 3,
    q: "After restoring a production database to staging, you need to replace the domain everywhere. What's the safe approach?",
    o: [
      "Find and replace in a text editor on the .sql dump",
      "Run SQL UPDATE ... REPLACE() on every table",
      "Change only siteurl and home",
      "Use wp search-replace, which handles serialized data correctly (run with --dry-run first)"
    ],
    a: 3,
    t: "Serialized PHP strings store their length, for example s:18:\"...\". A plain text replace that changes the length corrupts them and the values silently fail to unserialize. wp search-replace unserializes, replaces and reserializes the data.",
    p: "Some stored data has a label saying how many letters it contains. Change the text without updating the label and the data breaks. This tool updates both.",
    refs: ["https://developer.wordpress.org/cli/commands/search-replace/"]
  },
  {
    id: "q-0099",
    s: "Disaster Recovery", d: 2, level: "Author", stage: 3,
    q: "A bad commit was deployed from the shared main branch. What's the cleanest Git rollback that keeps history?",
    o: [
      "git revert <commit>, which creates a new commit that undoes the change, then deploy",
      "Delete the repository and re-clone it",
      "Edit the files on the server by hand",
      "git reset --hard HEAD~1, then force-push to main"
    ],
    a: 0,
    t: "revert adds a new commit that inverses the bad one, so shared history isn't rewritten and other developers' clones aren't broken. It's also auditable and goes through the normal CI/CD pipeline. Force-pushing a reset rewrites history everyone depends on.",
    p: "Instead of tearing a page out of the shared logbook, add a new entry that says 'undo what we did on that page.'",
    refs: ["https://git-scm.com/docs/git-revert"]
  },
  {
    id: "q-0100",
    s: "Debugging", d: 2, level: "Author", stage: 3,
    q: "The logs show 'Allowed memory size of 268435456 bytes exhausted' on an archive page. What's the best first step?",
    o: [
      "Restart the server every hour",
      "Raise WP_MEMORY_LIMIT to 2G and move on",
      "Use the stack trace or a profiler to find what's loading too much (for example an unbounded query), and fix that code",
      "Disable all caching"
    ],
    a: 2,
    t: "The trace shows which file and line was allocating when memory ran out. Common causes are posts_per_page => -1, loading full post objects when IDs would do, huge autoloaded options, or recursive hooks. Raising the limit only hides the problem until the data grows again.",
    p: "If a bag keeps tearing, find out what's overloading it before buying a bigger bag.",
    refs: [
      "https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/",
      "https://www.php.net/manual/en/ini.core.php#ini.memory-limit"
    ]
  },
  {
    id: "q-0101",
    s: "Security", d: 3, level: "Editor", stage: 3,
    q: "Which of these functions VERIFY a nonce (rather than create one)?",
    o: [
      "check_admin_referer()",
      "wp_create_nonce()",
      "check_ajax_referer()",
      "wp_nonce_field()",
      "wp_verify_nonce()"
    ],
    a: [0, 2, 4],
    t: "wp_verify_nonce() is the low-level check. check_admin_referer() wraps it for admin form submissions, and check_ajax_referer() wraps it for AJAX handlers. Both of those die on failure by default. wp_create_nonce() and wp_nonce_field() only generate nonces, one as a string and one as a hidden field.",
    p: "Some functions print the permission slip and others check it. Only the three 'checkers' actually stop a forged request.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_verify_nonce/",
      "https://developer.wordpress.org/apis/security/nonces/"
    ]
  },
  {
    id: "q-0102",
    s: "Security", d: 3, level: "Editor", stage: 3,
    q: "Which pairings of output context and escaping function are correct?",
    o: [
      "Text inside a <textarea> → esc_textarea()",
      "Value inside an HTML attribute → esc_attr()",
      "Small string inside an inline onclick handler → esc_js()",
      "URL being saved to the database → esc_url()",
      "URL in an href → esc_url()",
      "Plain text in the HTML body → esc_url()"
    ],
    a: [0, 1, 2, 4],
    t: "Escape late and for the exact context. esc_attr() is for attributes, esc_url() for URLs being displayed, esc_textarea() for textarea content, and esc_js() for inline JavaScript strings in attributes. For a URL going into the database, use esc_url_raw() or sanitize_url() instead, because esc_url() encodes characters like & for display. Body text uses esc_html().",
    p: "Every place on the page has its own kind of safety wrapping. Using the wrong wrapper either breaks the output or leaves a gap.",
    refs: ["https://developer.wordpress.org/apis/security/escaping/"]
  },
  {
    id: "q-0103",
    s: "Security", d: 3, level: "Editor", stage: 3,
    q: "A feature fetches a user-supplied URL on the server. Which measures help mitigate SSRF?",
    o: [
      "Disable redirect following, or re-validate every redirect target",
      "Resolve the hostname and reject private, loopback and link-local IPs",
      "Increase the request timeout",
      "Use wp_safe_remote_get() instead of wp_remote_get()",
      "Allow only an approved list of domains",
      "Strip the query string from the URL"
    ],
    a: [0, 1, 3, 4],
    t: "SSRF defense means controlling where the server can connect. Allowlists, wp_safe_remote_*() (which validates the host and port), and blocking internal IP ranges after DNS resolution all do that. Redirects are a classic way around a check made only on the first URL. Timeouts and query strings don't affect the destination.",
    p: "You're stopping strangers from using your server as a remote control to poke at your private network. The fixes all limit where it's allowed to go.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_safe_remote_get/",
      "https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html"
    ]
  },
  {
    id: "q-0104",
    s: "Performance", d: 3, level: "Editor", stage: 3,
    q: "You need full post objects to print 10 titles. There's no pagination, and you never touch meta or terms. Which WP_Query arguments reduce overhead?",
    o: [
      "'cache_results' => false",
      "'no_found_rows' => true",
      "'orderby' => 'rand'",
      "'update_post_meta_cache' => false",
      "'posts_per_page' => -1",
      "'update_post_term_cache' => false"
    ],
    a: [1, 3, 5],
    t: "no_found_rows skips the count query used for pagination. The two update_*_cache flags stop WP_Query from bulk-loading meta and terms you won't use. -1 removes the limit, cache_results => false turns off post caching, and orderby rand forces an expensive full sort. All three of those make things worse.",
    p: "Only ask the database for what you'll actually show: no counting, no extra details you'll never read.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_query/"]
  },
  {
    id: "q-0105",
    s: "Performance", d: 3, level: "Editor", stage: 3,
    q: "Which of these are recognized query performance anti-patterns on large WordPress sites?",
    o: [
      "A meta_query using LIKE against meta_value",
      "Caching remote API responses in the object cache",
      "'no_found_rows' => true when you don't paginate",
      "A large post__not_in array",
      "'posts_per_page' => -1",
      "'orderby' => 'rand'"
    ],
    a: [0, 3, 4, 5],
    t: "Unbounded result sets, wildcard matches on unindexed meta_value, ORDER BY RAND() (which sorts the whole table) and big NOT IN lists all get worse as content grows, and they're hard to cache. no_found_rows and caching remote calls are recommended practices.",
    p: "These are the habits that work fine on a small site and fall over on a big one.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_query/"]
  },
  {
    id: "q-0106",
    s: "WordPress Core", d: 3, level: "Editor", stage: 3,
    q: "On a multisite network, which statements about transients are true?",
    o: [
      "With a persistent object cache, transients are kept in the cache instead of the database",
      "set_transient() data is scoped to the current site",
      "set_site_transient() data is shared across the whole network",
      "Transients are guaranteed to exist until they expire",
      "Without a persistent object cache, site transients are stored in wp_sitemeta"
    ],
    a: [0, 1, 2, 4],
    t: "Regular transients live in each site's own options table, and site transients live in the network's sitemeta table. When an object-cache drop-in is active, both go to the cache backend. Expiration is a maximum lifetime, never a guarantee.",
    p: "One kind of temporary note is per site and the other is shared by the whole network. Either can be thrown away early.",
    refs: [
      "https://developer.wordpress.org/apis/transients/",
      "https://developer.wordpress.org/reference/functions/set_site_transient/"
    ]
  },
  {
    id: "q-0107",
    s: "WordPress Core", d: 3, level: "Administrator", stage: 1,
    q: "Which statements about static and dynamic blocks are true?",
    o: [
      "Dynamic blocks can't have attributes",
      "A static block's save() output is stored in post_content",
      "A dynamic block is rendered by PHP on each request, so markup changes apply without re-saving posts",
      "Changing a static block's save() without a deprecation causes 'unexpected or invalid content' errors",
      "Static blocks are re-rendered by PHP on every page load"
    ],
    a: [1, 2, 3],
    t: "Static blocks save their HTML into the post. The editor checks that saved markup against save(), so changing save() needs a deprecated entry to migrate old content. Dynamic blocks store their attributes in the block comment and render on the server through render or render_callback. They do have attributes.",
    p: "Static blocks are printed once and stored, so changing the design means reprinting. Dynamic blocks are drawn fresh every time a page loads.",
    refs: [
      "https://developer.wordpress.org/block-editor/getting-started/fundamentals/static-dynamic-rendering/",
      "https://developer.wordpress.org/block-editor/reference-guides/block-api/block-deprecation/"
    ]
  },
  {
    id: "q-0108",
    s: "Custom Development", d: 3, level: "Administrator", stage: 1,
    q: "Which clean-up tasks belong in a plugin's uninstall routine (uninstall.php or register_uninstall_hook) rather than in deactivation?",
    o: [
      "Deleting the plugin's options",
      "Flushing rewrite rules",
      "Dropping the plugin's custom tables",
      "Unscheduling the plugin's cron events",
      "Deleting plugin-specific user meta"
    ],
    a: [0, 2, 4],
    t: "Deactivation should be reversible, so it stops recurring work (unscheduling cron events) and flushes rewrite rules. Uninstall is the user saying 'remove it for good', so that's when you permanently delete data: options, tables and user meta.",
    p: "Turning a plugin off should be like pausing it. Only deleting it should throw away its data.",
    refs: ["https://developer.wordpress.org/plugins/plugin-basics/uninstall-methods/"]
  },
  {
    id: "q-0109",
    s: "Custom Development", d: 3, level: "Administrator", stage: 1,
    q: "Which approaches correctly keep WP-CLI command code from running during web requests?",
    o: [
      "Check defined( 'WP_CLI' ) && WP_CLI before loading command code",
      "Only call WP_CLI::add_command() inside a defined( 'WP_CLI' ) && WP_CLI block",
      "Check wp_doing_ajax()",
      "Check whether $_SERVER['HTTP_HOST'] is empty",
      "Check is_admin()"
    ],
    a: [0, 1],
    t: "WP-CLI defines the WP_CLI constant, which is the documented and reliable signal. Loading command classes only inside that branch keeps them out of HTTP requests entirely. is_admin() and wp_doing_ajax() describe web contexts, and server variables can be missing or spoofed in other situations too.",
    p: "Use WP-CLI's own 'I'm running' flag, and only load the command-line tools when that flag is up.",
    refs: ["https://make.wordpress.org/cli/handbook/guides/commands-cookbook/"]
  },
  {
    id: "q-0110",
    s: "Custom Development", d: 3, level: "Administrator", stage: 1,
    q: "Which internationalization practices are correct?",
    o: [
      "_n() for strings that change with a number",
      "__( 'Hello', 'my-plugin' ) with a literal string and a literal text domain",
      "sprintf( __( '%s items', 'my-plugin' ), $n ) with a /* translators: */ comment",
      "__( 'Hi', MY_TEXT_DOMAIN ) with a constant as the text domain",
      "__( 'Hello ' . $name, 'my-plugin' ) with concatenation",
      "__( $message, 'my-plugin' ) with a variable string"
    ],
    a: [0, 1, 2],
    t: "Translation tools such as WP-CLI's i18n make-pot read source code statically. They can only pick up literal strings and literal text domains. Use placeholders instead of concatenation so translators can reorder words, add translators comments for context, and use _n() for plurals.",
    p: "Translators get a list of exact sentences pulled from your code. If the sentence is built on the fly or hidden in a variable, it never reaches them.",
    refs: [
      "https://developer.wordpress.org/plugins/internationalization/how-to-internationalize-your-plugin/"
    ]
  },
  {
    id: "q-0111",
    s: "Scalability", d: 3, level: "Administrator", stage: 1,
    q: "Which are needed for a stateless WordPress web tier behind a load balancer?",
    o: [
      "No PHP sessions stored on a node's local disk",
      "Each node running its own unreplicated MySQL copy",
      "Uploads on shared or object storage",
      "Identical code deployed to every node",
      "Sticky sessions so each user's uploads stay on one server",
      "A persistent object cache shared by all nodes"
    ],
    a: [0, 2, 3, 5],
    t: "Any request can land on any node, so everything that represents state (files, cache, sessions, code version) must be shared or identical. Sticky sessions only hide the problem and break during failover. Separate databases split your data.",
    p: "Every server in the pool has to be interchangeable, so nothing important can live on just one of them.",
    refs: [
      "https://developer.wordpress.org/advanced-administration/performance/cache/",
      "https://developer.wordpress.org/reference/functions/wp_cache_set/"
    ]
  },
  {
    id: "q-0112",
    s: "Scalability", d: 3, level: "Administrator", stage: 2,
    q: "Which Cache-Control statements are correct?",
    o: [
      "no-store means no cache may store the response",
      "stale-if-error lets a cache serve stale content when the origin returns errors",
      "no-cache means the response is never stored",
      "s-maxage applies to shared caches (CDNs) and takes priority over max-age there",
      "private stops shared caches like CDNs from storing the response",
      "max-age is measured in milliseconds"
    ],
    a: [0, 1, 3, 4],
    t: "no-cache is often misunderstood. It allows storing, but the cache must revalidate with the origin before reusing the response. Use no-store to forbid storage. max-age and s-maxage are in seconds. stale-if-error keeps the site up while the origin is down.",
    p: "These headers are instructions to the CDN: how long to keep a copy, who may keep it, and what to do if the main server is struggling.",
    refs: ["https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control"]
  },
  {
    id: "q-0113",
    s: "Debugging", d: 3, level: "Administrator", stage: 2,
    q: "In WordPress 6.6+, which autoload values in wp_options mean the option IS loaded on every request?",
    o: ["'auto'", "'on'", "'yes'", "'auto-on'", "'auto-off'", "'off'"],
    a: [0, 1, 2, 3],
    t: "WordPress 6.6 added new autoload values. 'on' and 'off' are explicit, 'auto-on' and 'auto-off' are WordPress's own decisions, and 'auto' means no decision was made. wp_autoload_values_to_autoload() returns yes, on, auto-on and auto, and the legacy 'yes' still counts. When auditing bloat, check all four, not just 'yes'.",
    p: "Newer WordPress uses several labels that all mean 'load this every time'. If you only look for the old label, you'll miss most of them.",
    refs: ["https://make.wordpress.org/core/2024/06/18/options-api-disabling-autoload-for-large-options/"]
  },
  {
    id: "q-0114",
    s: "Debugging", d: 3, level: "Administrator", stage: 2,
    q: "Your theme's JavaScript gets 401/403 errors from a custom REST route for a logged-in user. Which checks help pin down the cause?",
    o: [
      "Read the route's permission_callback logic",
      "Confirm the nonce was created with the 'wp_rest' action",
      "Inspect the JSON error code, such as rest_forbidden or rest_cookie_invalid_nonce",
      "Raise WP_MEMORY_LIMIT",
      "Confirm the request sends an X-WP-Nonce header",
      "Flush the rewrite rules"
    ],
    a: [0, 1, 2, 4],
    t: "Cookie auth fails silently without a valid wp_rest nonce, which leaves the user ID at 0. An invalid nonce returns rest_cookie_invalid_nonce, and a failed permission check returns rest_forbidden. Rewrites cause 404s, not auth errors, and memory has nothing to do with it.",
    p: "Check the permission slip, check the rule that reads it, and read the error message, which usually says exactly which one failed.",
    refs: [
      "https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/",
      "https://developer.wordpress.org/reference/functions/register_rest_route/"
    ]
  },
  {
    id: "q-0115",
    s: "Debugging", d: 3, level: "Administrator", stage: 2,
    q: "Which debugging techniques are reasonable to use on a live production site?",
    o: [
      "Query Monitor, which only shows its output to administrators by default",
      "A temporary debug response header shown only to one admin user or IP",
      "Reading APM traces from tools like New Relic or Datadog",
      "Adding var_dump() to theme templates",
      "Logging to a file outside the web root with WP_DEBUG_DISPLAY off",
      "Turning on Xdebug step debugging on production web servers"
    ],
    a: [0, 1, 2, 4],
    t: "Production debugging should be read-only, targeted and low-overhead. Private logs, scoped headers, APM and admin-only Query Monitor fit that. Xdebug adds heavy overhead and can pause requests, and var_dump() leaks internals to every visitor.",
    p: "On the live site, watch quietly from behind the scenes. Don't stop the machine or shout debug output at your visitors.",
    refs: ["https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/"]
  },
  {
    id: "q-0116",
    s: "Change Management", d: 3, level: "Administrator", stage: 2,
    q: "Which of these belong in a WordPress project's Git repository?",
    o: [
      "A wp-config.php containing the production database password",
      "wp-content/uploads",
      "Custom theme and plugin source code",
      "composer.json and composer.lock",
      "A config file that reads secrets from environment variables",
      "Compiled vendor/ and node_modules/ directories"
    ],
    a: [2, 3, 4],
    t: "Commit what you write plus the dependency manifests and lock files, so builds are reproducible. Keep secrets out of code by reading them from the environment. Uploads are user content and belong in backups and storage. Build artifacts are produced in CI.",
    p: "Git is for the recipe, not the ingredients or the house keys.",
    refs: ["https://git-scm.com/docs/gitignore", "https://getcomposer.org/doc/01-basic-usage.md"]
  },
  {
    id: "q-0117",
    s: "Change Management", d: 3, level: "Administrator", stage: 3,
    q: "A plugin is at 4.2.7. Which version bumps follow semantic versioning?",
    o: [
      "Adding a backward-compatible feature → 5.0.0",
      "Fixing a bug with no API change → 4.2.8",
      "Removing a deprecated public function → 5.0.0",
      "Changing a public function's return type in a breaking way → 4.2.8",
      "Adding a new, backward-compatible filter hook → 4.3.0"
    ],
    a: [1, 2, 4],
    t: "MAJOR is for breaking changes, MINOR for compatible additions and PATCH for compatible fixes. Any breaking change to the public API, including removals and return-type changes, needs a MAJOR bump. A compatible feature only needs MINOR.",
    p: "The version number tells users how careful to be: last digit means 'safe fix', middle means 'new stuff', first means 'might break things'.",
    refs: ["https://semver.org/"]
  },
  {
    id: "q-0118",
    s: "Disaster Recovery", d: 3, level: "Administrator", stage: 3,
    q: "You've restored a clean database backup after a hack. Which steps are needed before going live again?",
    o: [
      "Reinstall the same plugin versions without updating them",
      "Reset all administrator passwords and application passwords",
      "Rotate the salts and keys in wp-config.php",
      "Check wp_users and wp_usermeta for unknown administrator accounts",
      "Find and fix the entry point, such as a vulnerable plugin",
      "Skip the file checks because the database was restored"
    ],
    a: [1, 2, 3, 4],
    t: "Restoring data doesn't remove the way in or the stolen credentials. Rotating salts invalidates existing sessions. Resetting credentials stops attackers who may have taken them. Closing the hole stops reinfection, and backdoor admins can hide in user meta. Files must also be verified, for example with checksums.",
    p: "Putting the furniture back isn't enough. Change the locks, find the broken window, and check nobody's hiding in the attic.",
    refs: [
      "https://developer.wordpress.org/advanced-administration/security/hardening/",
      "https://developer.wordpress.org/reference/functions/wp_salt/"
    ]
  },
  {
    id: "q-0119",
    s: "Disaster Recovery", d: 3, level: "Administrator", stage: 3,
    q: "One important post's content was overwritten yesterday. Which recovery approaches are safe?",
    o: [
      "Restore the backup into a separate temporary database and copy just the needed rows",
      "Restore the backup on staging, export that post, and import it into production",
      "Import the full backup over production",
      "Edit its serialized meta by hand with SQL REPLACE()",
      "Recover it from the post's revisions, if they exist"
    ],
    a: [0, 1, 4],
    t: "Partial restores should be isolated and targeted, so everything else that changed since the backup isn't overwritten. Revisions are the cheapest source if they exist. A full import loses all other recent changes, and editing serialized data by hand risks corrupting it.",
    p: "To get one page back, pull it from a copy of the old version. Don't roll the whole site back a day.",
    refs: [
      "https://wordpress.org/documentation/article/revisions/",
      "https://developer.wordpress.org/advanced-administration/security/backup/database/"
    ]
  },
  {
    id: "q-0120",
    s: "Disaster Recovery", d: 3, level: "Administrator", stage: 3,
    q: "Which checks help validate a site's integrity after a restore?",
    o: [
      "A query for orphaned postmeta (a LEFT JOIN to wp_posts where the post is missing)",
      "wp core verify-checksums",
      "Comparing key row counts with pre-incident numbers",
      "Assuming it's fine because the home page loads",
      "wp plugin verify-checksums --all"
    ],
    a: [0, 1, 2, 4],
    t: "Checksums compare core and WordPress.org plugin files with the official releases, which catches modified or injected files. Orphan queries find broken relationships. Row-count comparisons catch missing data. A home page that loads tells you almost nothing.",
    p: "Check the files against the originals, check the data adds up, and don't trust it just because the front door opens.",
    refs: [
      "https://developer.wordpress.org/cli/commands/core/verify-checksums/",
      "https://developer.wordpress.org/cli/commands/plugin/verify-checksums/"
    ]
  },
  {
    id: "q-0121",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "Which default role can edit and publish posts written by other users, and moderate comments?",
    o: ["Contributor", "Author", "Subscriber", "Editor"],
    a: 3,
    t: "Editors can publish and manage posts and pages, including other users' posts, and moderate comments. Authors manage only their own posts.",
    p: "The Editor is the section editor: they can change anyone's article.",
    refs: ["https://wordpress.org/documentation/article/roles-and-capabilities/"]
  },
  {
    id: "q-0122",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "On a single (non-multisite) WordPress site, which default role can install plugins?",
    o: ["Editor", "Any logged-in user", "Administrator", "Author"],
    a: 2,
    t: "install_plugins belongs to the Administrator role on a single site. On multisite, only the Super Admin can install plugins.",
    p: "Only the site owner gets the keys to add new software.",
    refs: ["https://wordpress.org/documentation/article/roles-and-capabilities/"]
  },
  {
    id: "q-0123",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "When does the Super Admin role exist?",
    o: [
      "Only on a multisite network",
      "Only on WordPress.com",
      "On every WordPress site",
      "Only when WP_DEBUG is on"
    ],
    a: 0,
    t: "Super Admin is the network-level role on multisite. On a single site, the Administrator has the top-level capabilities.",
    p: "It's the boss of a group of sites, so it only appears when you run a group.",
    refs: ["https://wordpress.org/documentation/article/roles-and-capabilities/"]
  },
  {
    id: "q-0124",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "A Contributor finishes a post and clicks \"Submit for Review\". What status does the post get?",
    o: ["Private", "Draft", "Published", "Pending"],
    a: 3,
    t: "Contributors can't publish, so submitting moves the post to the \"pending\" status for an Editor or Administrator to review.",
    p: "It goes into the \"waiting for approval\" pile.",
    refs: [
      "https://wordpress.org/documentation/article/roles-and-capabilities/",
      "https://developer.wordpress.org/reference/functions/get_post_statuses/"
    ]
  },
  {
    id: "q-0125",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "What's the main structural difference between categories and tags?",
    o: [
      "Tags are private and categories are public",
      "Categories can have parent and child terms; tags are flat",
      "Categories are for pages only",
      "Tags can have parents; categories can't"
    ],
    a: 1,
    t: "Categories are a hierarchical taxonomy and tags are non-hierarchical. register_taxonomy()'s hierarchical argument controls this for custom taxonomies.",
    p: "Categories are folders inside folders. Tags are loose labels.",
    refs: ["https://developer.wordpress.org/reference/functions/register_taxonomy/"]
  },
  {
    id: "q-0126",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "What does marking a post as \"sticky\" do?",
    o: [
      "Stops comments on it",
      "Keeps it at the top of the blog posts page, above newer posts",
      "Hides it from search engines",
      "Locks it so nobody else can edit it"
    ],
    a: 1,
    t: "Sticky posts are placed at the top of the posts page (the home page when it shows latest posts). is_sticky() checks whether a post is sticky.",
    p: "It pins the post to the top of the noticeboard.",
    refs: [
      "https://developer.wordpress.org/reference/functions/is_sticky/",
      "https://developer.wordpress.org/reference/functions/stick_post/"
    ]
  },
  {
    id: "q-0127",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "By default, where does WordPress store uploaded media files?",
    o: [
      "In the theme folder",
      "In wp-includes/media",
      "In the database as binary data",
      "In wp-content/uploads, in year/month folders"
    ],
    a: 3,
    t: "Files go to wp-content/uploads, organised into year and month folders by default. wp_upload_dir() returns the current paths and URLs.",
    p: "Your pictures are kept as files in a dated folder, not inside the database.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_upload_dir/"]
  },
  {
    id: "q-0128",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "Which folders hold WordPress core files that get replaced on every core update, so you should never edit them?",
    o: [
      "wp-content/languages",
      "wp-admin and wp-includes",
      "wp-content/uploads",
      "wp-content/themes and wp-content/plugins"
    ],
    a: 1,
    t: "Core updates replace wp-admin and wp-includes. Customisations belong in themes, child themes and plugins inside wp-content.",
    p: "Those folders belong to WordPress itself, and an update overwrites them.",
    refs: ["https://developer.wordpress.org/advanced-administration/upgrade/upgrading/"]
  },
  {
    id: "q-0129",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "Since WordPress 5.0, what's the default editor for posts and pages?",
    o: ["The Customizer", "The Classic Editor", "A plain HTML textarea", "The block editor"],
    a: 3,
    t: "WordPress 5.0 made the block editor (developed as the Gutenberg project) the default. The Classic Editor is available as a plugin.",
    p: "Since 5.0 you build pages from blocks, like stacking bricks.",
    refs: ["https://wordpress.org/documentation/wordpress-version/version-5-0/"]
  },
  {
    id: "q-0130",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "In a block theme, what's a template part?",
    o: [
      "A plugin settings page",
      "A database table",
      "A single paragraph block",
      "A reusable area such as a header or footer shared by several templates"
    ],
    a: 3,
    t: "Template parts are reusable structural pieces (header, footer, sidebar) placed in templates and edited in the Site Editor.",
    p: "It's a shared piece, like a header, used on many pages at once.",
    refs: [
      "https://wordpress.org/documentation/article/comparing-patterns-template-parts-and-reusable-blocks/"
    ]
  },
  {
    id: "q-0131",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "Which feature lets you edit a whole block theme's templates, template parts and styles from wp-admin?",
    o: ["Settings → Reading", "The Site Editor", "The Theme File Editor", "The Widgets screen"],
    a: 1,
    t: "The Site Editor (Appearance → Editor) edits templates, template parts, navigation, patterns and global styles for block themes.",
    p: "It's the visual editor for the whole site, not just one page.",
    refs: ["https://wordpress.org/documentation/wordpress-version/version-6-3/"]
  },
  {
    id: "q-0132",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "Where does WordPress get the profile pictures it shows next to comments by default?",
    o: [
      "From the user's browser",
      "From the theme folder",
      "From the Media Library",
      "From Gravatar, based on the email address"
    ],
    a: 3,
    t: "get_avatar() returns a Gravatar image tied to an email address unless a plugin or filter changes the source.",
    p: "It looks up a picture linked to the person's email.",
    refs: ["https://developer.wordpress.org/reference/functions/get_avatar/"]
  },
  {
    id: "q-0133",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "Which settings screen holds the site title, tagline and the default role for new users?",
    o: ["Tools → Site Health", "Settings → Discussion", "Settings → General", "Settings → Writing"],
    a: 2,
    t: "Settings → General covers the site title, tagline, addresses, membership, new user default role, time zone and date formats.",
    p: "It's the main \"about this site\" settings page.",
    refs: ["https://wordpress.org/documentation/article/administration-screens/"]
  },
  {
    id: "q-0134",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "Where do you set whether comments must be manually approved before they appear?",
    o: ["Appearance → Customize", "Settings → Discussion", "Settings → Reading", "Users → Profile"],
    a: 1,
    t: "Settings → Discussion controls comment moderation, notifications, avatars and other comment behaviour.",
    p: "The Discussion page decides how comments are handled.",
    refs: ["https://wordpress.org/documentation/article/administration-screens/"]
  },
  {
    id: "q-0135",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "What's a post's slug?",
    o: [
      "Its database ID number",
      "Its featured image",
      "Its URL-friendly name used in the permalink, such as my-first-post",
      "Its excerpt"
    ],
    a: 2,
    t: "The slug is the URL-safe version of the title used in pretty permalinks, such as example.com/my-first-post/.",
    p: "It's the short name in the web address.",
    refs: ["https://wordpress.org/documentation/article/customize-permalinks/"]
  },
  {
    id: "q-0136",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "What does a \"Plain\" permalink look like?",
    o: [
      "example.com/?p=123",
      "example.com/category/my-post/",
      "example.com/2026/11/my-post/",
      "example.com/my-post/"
    ],
    a: 0,
    t: "Plain permalinks use a query string with the post ID, such as ?p=123. Pretty permalinks use readable paths.",
    p: "It uses a number instead of words in the address.",
    refs: ["https://wordpress.org/documentation/article/customize-permalinks/"]
  },
  {
    id: "q-0137",
    s: "Change Management", d: 1, level: "Subscriber", stage: 1,
    q: "Out of the box, which WordPress core updates install automatically?",
    o: [
      "None; every update is manual",
      "Only major releases",
      "Every plugin and theme update",
      "Minor and security releases"
    ],
    a: 3,
    t: "Since WordPress 3.7, minor (maintenance and security) core releases update automatically by default. WP_AUTO_UPDATE_CORE in wp-config.php changes this.",
    p: "Small safety fixes install themselves. Big upgrades wait for you.",
    refs: ["https://developer.wordpress.org/advanced-administration/wordpress/wp-config/"]
  },
  {
    id: "q-0138",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "By default, how long do trashed posts and comments stay in the Trash before WordPress deletes them permanently?",
    o: ["90 days", "7 days", "Forever", "30 days"],
    a: 3,
    t: "EMPTY_TRASH_DAYS defaults to 30. Setting it in wp-config.php changes the period, and 0 disables the trash.",
    p: "The bin is emptied automatically after about a month.",
    refs: ["https://developer.wordpress.org/advanced-administration/wordpress/wp-config/"]
  },
  {
    id: "q-0139",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "Who can see a post set to \"Private\" visibility?",
    o: [
      "Only the post's author, even Administrators can't",
      "Everyone, but it's hidden from search engines",
      "Only logged-in users with the right capability, such as Editors and Administrators",
      "Anyone with a password"
    ],
    a: 2,
    t: "Private posts are visible only to logged-in users who can read private posts (Editors and Administrators by default) and the author.",
    p: "It's on the site, but only staff with permission can open it.",
    refs: ["https://wordpress.org/documentation/article/roles-and-capabilities/"]
  },
  {
    id: "q-0140",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 1,
    q: "Which wp-admin screen lists available updates for WordPress core, plugins and themes?",
    o: ["Tools → Import", "Dashboard → Updates", "Settings → General", "Plugins → Add New"],
    a: 1,
    t: "Dashboard → Updates shows core, plugin, theme and translation updates and warns you to back up first.",
    p: "It's the \"what needs updating\" page.",
    refs: ["https://learn.wordpress.org/tutorial/managing-updates"]
  },
  {
    id: "q-0141",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "You want to change the text of every post before it's displayed. Which kind of hook do you use?",
    o: ["A shortcode", "A cron event", "A filter, such as the_content", "An action, such as wp_footer"],
    a: 2,
    t: "Filters receive a value, can change it and must return it. the_content is the filter for post content on output.",
    p: "A filter lets you edit something as it passes through.",
    refs: [
      "https://developer.wordpress.org/reference/functions/add_filter/",
      "https://developer.wordpress.org/plugins/hooks/"
    ]
  },
  {
    id: "q-0142",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "On which hook should register_post_type() normally be called?",
    o: ["admin_footer", "shutdown", "init", "wp_head"],
    a: 2,
    t: "Post types should be registered on init, so they exist before WordPress parses requests and builds rewrite rules.",
    p: "Register new content types early, while WordPress is starting up.",
    refs: ["https://developer.wordpress.org/reference/functions/register_post_type/"]
  },
  {
    id: "q-0143",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "What does get_header() do in a classic theme template?",
    o: [
      "Loads the theme's header.php file",
      "Registers a header image",
      "Prints the site title only",
      "Returns the HTTP headers"
    ],
    a: 0,
    t: "get_header() includes header.php (or header-{name}.php when a name is passed) and fires the get_header action.",
    p: "It pulls in the top part of the page.",
    refs: ["https://developer.wordpress.org/reference/functions/get_header/"]
  },
  {
    id: "q-0144",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "What's the difference between the_title() and get_the_title()?",
    o: [
      "They're identical",
      "the_title() prints the title; get_the_title() returns it as a value",
      "get_the_title() prints; the_title() returns",
      "the_title() works only in the admin"
    ],
    a: 1,
    t: "Template tags starting with the_ usually echo. get_ versions return the value so you can store or change it.",
    p: "One says it out loud, the other hands you a note with it written down.",
    refs: [
      "https://developer.wordpress.org/reference/functions/get_the_title/",
      "https://developer.wordpress.org/reference/functions/the_title/"
    ]
  },
  {
    id: "q-0145",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "In a child theme, which loads first: the child's functions.php or the parent's?",
    o: ["The parent's", "Only the parent's runs", "The child's", "Only the child's runs"],
    a: 2,
    t: "Both run. The child theme's functions.php loads just before the parent's, so it doesn't replace the parent file.",
    p: "Both files run, and the child goes first.",
    refs: ["https://developer.wordpress.org/themes/advanced-topics/child-themes/"]
  },
  {
    id: "q-0146",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "In the template hierarchy, which file is the final fallback that every classic theme must have?",
    o: ["page.php", "front-page.php", "index.php", "single.php"],
    a: 2,
    t: "If WordPress can't find a more specific template, it uses index.php. It's the only required template file.",
    p: "When nothing else fits, WordPress uses the default page.",
    refs: ["https://developer.wordpress.org/themes/classic-themes/basics/template-hierarchy/"]
  },
  {
    id: "q-0147",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "A visitor opens a regular page with the slug \"about\". Which file does WordPress try before page.php?",
    o: ["single-about.php", "page-about.php", "about.php", "archive-about.php"],
    a: 1,
    t: "For pages, WordPress checks a custom template, then page-{slug}.php, then page-{id}.php, then page.php, then singular.php and index.php.",
    p: "It looks for a file named after that exact page first.",
    refs: ["https://developer.wordpress.org/themes/classic-themes/basics/template-hierarchy/"]
  },
  {
    id: "q-0148",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "Which function registers menu locations that users can assign menus to?",
    o: ["wp_nav_menu()", "register_sidebar()", "register_nav_menus()", "add_menu_page()"],
    a: 2,
    t: "register_nav_menus() declares theme locations. wp_nav_menu() outputs a menu in a template, and add_menu_page() adds a wp-admin page.",
    p: "It creates the empty slots that menus can be placed into.",
    refs: [
      "https://developer.wordpress.org/reference/functions/register_nav_menus/",
      "https://developer.wordpress.org/reference/functions/wp_nav_menu/"
    ]
  },
  {
    id: "q-0149",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "What do you call to enable featured images in a classic theme?",
    o: [
      "add_image_size( 'featured' )",
      "add_theme_support( 'post-thumbnails' )",
      "enable_featured_images()",
      "register_post_meta( 'featured' )"
    ],
    a: 1,
    t: "add_theme_support( 'post-thumbnails' ) turns on the featured image box. the_post_thumbnail() then outputs it.",
    p: "You switch the feature on in the theme before using it.",
    refs: [
      "https://developer.wordpress.org/reference/functions/add_theme_support/",
      "https://developer.wordpress.org/reference/functions/the_post_thumbnail/"
    ]
  },
  {
    id: "q-0150",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "Why must a classic theme call wp_head() before the closing </head> tag?",
    o: [
      "It's only needed for the admin bar",
      "It prints the site title",
      "Core and plugins hook into it to add styles, scripts and meta tags",
      "It closes the HTML document"
    ],
    a: 2,
    t: "wp_head() fires the wp_head action, which enqueued styles, scripts and many plugins rely on.",
    p: "It's the doorway other code uses to add things to the page head.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_head/"]
  },
  {
    id: "q-0151",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "Where should a classic theme call wp_footer()?",
    o: [
      "Inside functions.php",
      "At the top of header.php",
      "Only on the home page",
      "Just before the closing </body> tag"
    ],
    a: 3,
    t: "wp_footer() should run just before </body>, so footer scripts and the admin bar can be output.",
    p: "Put it at the very bottom of the page, so late additions have a place to go.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_footer/"]
  },
  {
    id: "q-0152",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "What does body_class() add to the <body> tag?",
    o: [
      "Inline styles",
      "The page ID as the tag name",
      "A list of CSS classes describing the current page, such as home, single or logged-in",
      "A nonce"
    ],
    a: 2,
    t: "body_class() prints classes based on the request (page type, template, user state) and can be extended with the body_class filter.",
    p: "It labels the page so your CSS can style each kind differently.",
    refs: ["https://developer.wordpress.org/reference/functions/body_class/"]
  },
  {
    id: "q-0153",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "Which function runs code once when a plugin is activated?",
    o: ["add_action( 'init' )", "register_activation_hook()", "register_uninstall_hook()", "plugins_loaded()"],
    a: 1,
    t: "register_activation_hook( __FILE__, $callback ) runs the callback on activation, which suits setting defaults or adding roles.",
    p: "It's the plugin's \"first day\" setup step.",
    refs: ["https://developer.wordpress.org/reference/functions/register_activation_hook/"]
  },
  {
    id: "q-0154",
    s: "Security", d: 1, level: "Subscriber", stage: 2,
    q: "What does this line at the top of a plugin file do: if ( ! defined( 'ABSPATH' ) ) exit;",
    o: [
      "Speeds up loading",
      "Disables the plugin on multisite",
      "Stops the file from being run directly by visiting its URL",
      "Checks the user is an Administrator"
    ],
    a: 2,
    t: "ABSPATH is defined when WordPress loads. If it's missing, the file was requested directly, so the script exits.",
    p: "It stops strangers from opening the file directly.",
    refs: ["https://developer.wordpress.org/plugins/plugin-basics/best-practices/"]
  },
  {
    id: "q-0155",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "Why should a plugin prefix its function names, such as myplugin_save()?",
    o: [
      "It makes code run faster",
      "To avoid name collisions with other plugins, themes and core",
      "To translate the names",
      "WordPress requires it to activate the plugin"
    ],
    a: 1,
    t: "All plugins share one PHP namespace. Prefixes (or real PHP namespaces and classes) prevent fatal \"cannot redeclare\" errors.",
    p: "A unique prefix stops your code from clashing with someone else's.",
    refs: ["https://developer.wordpress.org/plugins/plugin-basics/best-practices/"]
  },
  {
    id: "q-0156",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 2,
    q: "What does home_url() return?",
    o: [
      "The address where the site's front end is reached",
      "The path to the WordPress files on disk",
      "The theme folder URL",
      "The admin dashboard URL"
    ],
    a: 0,
    t: "home_url() is the public site address (the home option). site_url() is where WordPress core files live, which can differ.",
    p: "It's the address you give visitors.",
    refs: [
      "https://developer.wordpress.org/reference/functions/home_url/",
      "https://developer.wordpress.org/reference/functions/site_url/"
    ]
  },
  {
    id: "q-0157",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 2,
    q: "Which function reads a saved setting from the wp_options table?",
    o: ["get_theme_file_uri()", "get_option()", "get_user_meta()", "get_post_meta()"],
    a: 1,
    t: "get_option( $name, $default ) returns an option value, or the default when it isn't set.",
    p: "It looks up a site-wide setting by name.",
    refs: ["https://developer.wordpress.org/reference/functions/get_option/"]
  },
  {
    id: "q-0158",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 2,
    q: "What happens if you call update_option() for an option that doesn't exist yet?",
    o: ["It throws an error", "It does nothing", "It creates the option", "It creates a post"],
    a: 2,
    t: "update_option() adds the option if it doesn't exist, so you don't need to call add_option() first.",
    p: "If the setting isn't there, it creates it.",
    refs: ["https://developer.wordpress.org/reference/functions/update_option/"]
  },
  {
    id: "q-0159",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "Which function creates a new post from PHP code?",
    o: ["create_post()", "add_post()", "wp_insert_post()", "register_post_type()"],
    a: 2,
    t: "wp_insert_post() inserts (or updates, when an ID is passed) a post and returns its ID or a WP_Error.",
    p: "It writes a new post for you, without using the editor.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_insert_post/"]
  },
  {
    id: "q-0160",
    s: "Custom Development", d: 1, level: "Subscriber", stage: 2,
    q: "What's the recommended way to register a custom block's settings, scripts and styles?",
    o: [
      "Edit wp-includes/blocks",
      "Paste JavaScript into a Custom HTML block",
      "Describe them in block.json and call register_block_type() with its folder",
      "Add a shortcode"
    ],
    a: 2,
    t: "register_block_type() accepts the path to a folder containing block.json, which declares the block's name, attributes and assets.",
    p: "One settings file describes the block, and WordPress reads it.",
    refs: [
      "https://developer.wordpress.org/reference/functions/register_block_type/",
      "https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/"
    ]
  },
  {
    id: "q-0161",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 2,
    q: "What are post meta fields used for?",
    o: [
      "Storing extra key-value data attached to a post, such as a price or rating",
      "Storing the post's title",
      "Storing user passwords",
      "Storing site-wide settings"
    ],
    a: 0,
    t: "Post meta lives in wp_postmeta and is read and written with get_post_meta(), add_post_meta() and update_post_meta().",
    p: "They're extra labelled boxes attached to each post.",
    refs: [
      "https://developer.wordpress.org/reference/functions/get_post_meta/",
      "https://developer.wordpress.org/reference/functions/update_post_meta/"
    ]
  },
  {
    id: "q-0162",
    s: "Debugging", d: 1, level: "Subscriber", stage: 3,
    q: "On a live site, what should WP_DEBUG_DISPLAY be while you're logging errors?",
    o: [
      "It must be removed from wp-config.php",
      "false, so errors are logged but not shown to visitors",
      "It doesn't matter",
      "true, so visitors can report errors"
    ],
    a: 1,
    t: "Showing errors exposes paths and details to visitors. Log them with WP_DEBUG_LOG and keep display off.",
    p: "Write problems in a private notebook instead of on the shop window.",
    refs: ["https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/"]
  },
  {
    id: "q-0163",
    s: "Debugging", d: 1, level: "Subscriber", stage: 3,
    q: "With WP_DEBUG_LOG set to true, where are errors written by default?",
    o: ["The wp_options table", "The browser console", "wp-content/debug.log", "wp-admin/error.log"],
    a: 2,
    t: "The default log file is wp-content/debug.log. You can pass a path instead, ideally outside the public web root.",
    p: "They go into a text file inside wp-content.",
    refs: ["https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/"]
  },
  {
    id: "q-0164",
    s: "Debugging", d: 1, level: "Subscriber", stage: 3,
    q: "What does setting SCRIPT_DEBUG to true do?",
    o: [
      "Disables all scripts",
      "Shows SQL queries",
      "Logs PHP errors",
      "Loads the unminified \"dev\" versions of core CSS and JavaScript"
    ],
    a: 3,
    t: "SCRIPT_DEBUG makes WordPress load the full, readable versions of its own scripts and styles, which helps when debugging them.",
    p: "It swaps the squashed code for the readable version.",
    refs: ["https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/"]
  },
  {
    id: "q-0165",
    s: "Change Management", d: 1, level: "Subscriber", stage: 3,
    q: "Which WP-CLI command prints the installed WordPress version?",
    o: ["wp core version", "wp info", "wp version show", "wp core check"],
    a: 0,
    t: "wp core version shows the version. wp core check-update shows whether a newer one is available.",
    p: "Ask the command line which version you're on.",
    refs: ["https://developer.wordpress.org/cli/commands/core/version/"]
  },
  {
    id: "q-0166",
    s: "Change Management", d: 1, level: "Subscriber", stage: 3,
    q: "Which WP-CLI command creates a new user?",
    o: ["wp user add", "wp user create <login> <email>", "wp create user", "wp new user"],
    a: 1,
    t: "wp user create takes a login and email, plus options such as --role.",
    p: "One command makes a new account without using the dashboard.",
    refs: ["https://developer.wordpress.org/cli/commands/user/create/"]
  },
  {
    id: "q-0167",
    s: "Debugging", d: 1, level: "Subscriber", stage: 3,
    q: "You suspect a plugin conflict but can't risk breaking the site for visitors. Which tool lets you disable plugins only for your own session?",
    o: [
      "Switching the site to Plain permalinks",
      "Deleting the plugins folder",
      "Health Check & Troubleshooting plugin's Troubleshooting Mode",
      "Settings → Reading"
    ],
    a: 2,
    t: "Troubleshooting Mode disables plugins and switches to a default theme for your session only, while visitors see the normal site.",
    p: "You test in your own private bubble, and visitors notice nothing.",
    refs: ["https://wordpress.org/plugins/health-check/"]
  },
  {
    id: "q-0168",
    s: "Debugging", d: 1, level: "Subscriber", stage: 3,
    q: "You see \"Error establishing a database connection\". What do you check first?",
    o: [
      "The theme's style.css",
      "The permalink settings",
      "The Media Library",
      "The database name, user, password and host in wp-config.php, and whether the database server is up"
    ],
    a: 3,
    t: "This error means WordPress couldn't connect to MySQL: wrong credentials, a wrong host, or a database server that's down.",
    p: "WordPress can't reach its filing cabinet, so check the address and the key.",
    refs: ["https://developer.wordpress.org/advanced-administration/wordpress/common-errors/"]
  },
  {
    id: "q-0169",
    s: "Debugging", d: 1, level: "Subscriber", stage: 3,
    q: "A site shows a blank white page with no error. What's a sensible first step?",
    o: [
      "Reinstall the database",
      "Clear the browser history only",
      "Change the site title",
      "Enable WP_DEBUG (with logging) to see the PHP error"
    ],
    a: 3,
    t: "The \"white screen of death\" is usually a PHP fatal error. Debug logging reveals the message and the file responsible.",
    p: "Turn on the lights to see what tripped.",
    refs: [
      "https://developer.wordpress.org/advanced-administration/wordpress/common-errors/",
      "https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/"
    ]
  },
  {
    id: "q-0170",
    s: "Debugging", d: 1, level: "Subscriber", stage: 3,
    q: "PHP reports memory exhausted on a busy admin page. Which wp-config.php constant raises WordPress's memory limit (up to what the host allows)?",
    o: ["WP_MEMORY_LIMIT", "WP_POST_REVISIONS", "WP_DEBUG", "WP_CACHE"],
    a: 0,
    t: "WP_MEMORY_LIMIT (and WP_MAX_MEMORY_LIMIT for admin tasks) ask PHP for more memory, but can't exceed the server's limit. Fix the cause too.",
    p: "It asks for a bigger desk, as long as the room allows it.",
    refs: ["https://developer.wordpress.org/advanced-administration/wordpress/wp-config/"]
  },
  {
    id: "q-0171",
    s: "Security", d: 1, level: "Subscriber", stage: 3,
    q: "Which is a basic hardening step for user accounts?",
    o: [
      "Use strong, unique passwords and avoid predictable usernames such as \"admin\"",
      "Email passwords to users",
      "Share one admin account among the team",
      "Disable all logins"
    ],
    a: 0,
    t: "The hardening guide recommends strong passwords and not using guessable usernames, which helps against brute-force attacks.",
    p: "Don't use a lock everyone can guess.",
    refs: ["https://developer.wordpress.org/advanced-administration/security/hardening/"]
  },
  {
    id: "q-0172",
    s: "Security", d: 1, level: "Subscriber", stage: 3,
    q: "Which function cleans a single-line text input before saving it?",
    o: ["wp_kses_post()", "esc_html()", "sanitize_text_field()", "esc_url()"],
    a: 2,
    t: "sanitize_text_field() strips tags, line breaks and extra whitespace. esc_html() escapes for output, not input.",
    p: "Tidy the input when it comes in, and wrap it safely when it goes out.",
    refs: ["https://developer.wordpress.org/reference/functions/sanitize_text_field/"]
  },
  {
    id: "q-0173",
    s: "Security", d: 1, level: "Subscriber", stage: 3,
    q: "You're printing a post title inside a <p> tag. Which function escapes it?",
    o: ["esc_url()", "esc_html()", "sanitize_key()", "esc_attr()"],
    a: 1,
    t: "esc_html() encodes characters such as < and & for HTML text. esc_attr() is for attribute values and esc_url() is for URLs.",
    p: "Make sure the text is shown as text, not run as code.",
    refs: ["https://developer.wordpress.org/reference/functions/esc_html/"]
  },
  {
    id: "q-0174",
    s: "Security", d: 1, level: "Subscriber", stage: 3,
    q: "What happens when you change the authentication keys and salts in wp-config.php?",
    o: [
      "The database is encrypted",
      "Every logged-in user is logged out",
      "Nothing changes until the next update",
      "All passwords are reset"
    ],
    a: 1,
    t: "Keys and salts sign login cookies. New values invalidate existing cookies, so everyone has to log in again.",
    p: "Changing the locks means old keys stop working.",
    refs: [
      "https://developer.wordpress.org/advanced-administration/wordpress/wp-config/",
      "https://developer.wordpress.org/reference/functions/wp_salt/"
    ]
  },
  {
    id: "q-0175",
    s: "Security", d: 1, level: "Subscriber", stage: 3,
    q: "Why should you delete plugins and themes you no longer use?",
    o: [
      "They use up the database",
      "WordPress limits you to 10 plugins",
      "They slow down the editor",
      "Inactive code can still contain vulnerable files that can be reached directly"
    ],
    a: 3,
    t: "Deactivated plugins and themes still have files on the server. Removing unused code reduces the attack surface.",
    p: "An unused back door is still a door.",
    refs: ["https://developer.wordpress.org/advanced-administration/security/hardening/"]
  },
  {
    id: "q-0176",
    s: "WordPress Core", d: 1, level: "Subscriber", stage: 3,
    q: "Which wp-config.php constants override the site address settings?",
    o: ["WP_DEBUG and WP_CACHE", "ABSPATH and WPINC", "DB_HOST and DB_NAME", "WP_HOME and WP_SITEURL"],
    a: 3,
    t: "WP_HOME and WP_SITEURL override the home and siteurl options, which helps when moving a site or fixing a locked-out admin.",
    p: "They hard-code the site's address in the settings file.",
    refs: ["https://developer.wordpress.org/advanced-administration/wordpress/wp-config/"]
  },
  {
    id: "q-0177",
    s: "Security", d: 2, level: "Subscriber", stage: 3,
    q: "According to the hardening guide, where can wp-config.php be moved to keep it out of the public web root?",
    o: [
      "Into wp-content/uploads",
      "Into the theme folder",
      "One directory above the WordPress folder",
      "Anywhere; WordPress searches the whole disk"
    ],
    a: 2,
    t: "WordPress looks for wp-config.php in its own folder and one level up, so moving it up keeps it outside the web root on many setups.",
    p: "You can store the key file one shelf higher, out of reach.",
    refs: ["https://developer.wordpress.org/advanced-administration/security/hardening/"]
  },
  {
    id: "q-0178",
    s: "Security", d: 1, level: "Subscriber", stage: 3,
    q: "Where does a user create an Application Password for API access?",
    o: [
      "With a plugin only",
      "In Settings → General",
      "In wp-config.php",
      "On their profile screen in wp-admin"
    ],
    a: 3,
    t: "Since WordPress 5.6, Application Passwords are created and revoked on the user's profile screen and work over HTTPS.",
    p: "Each user makes app-only passwords from their own profile.",
    refs: ["https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/"]
  },
  {
    id: "q-0179",
    s: "Change Management", d: 1, level: "Subscriber", stage: 3,
    q: "Why test plugin and theme updates on a staging copy first?",
    o: [
      "It's required by WordPress",
      "Updates only work on staging",
      "Staging sites update faster",
      "So problems show up where visitors aren't affected"
    ],
    a: 3,
    t: "A sandbox or staging copy lets you see breaking changes and conflicts before they reach the live site.",
    p: "Try it in the practice kitchen before serving customers.",
    refs: ["https://developer.wordpress.org/advanced-administration/debug/test-driving/"]
  },
  {
    id: "q-0180",
    s: "Disaster Recovery", d: 1, level: "Subscriber", stage: 3,
    q: "Which WP-CLI command exports the database to an SQL file?",
    o: ["wp db dump-all", "wp backup create", "wp db export", "wp export --db"],
    a: 2,
    t: "wp db export writes an SQL dump (using mysqldump). wp db import loads one.",
    p: "One command saves the whole database to a file.",
    refs: ["https://developer.wordpress.org/cli/commands/db/export/"]
  },
  {
    id: "q-0181",
    s: "Disaster Recovery", d: 1, level: "Subscriber", stage: 3,
    q: "According to the WordPress backup guide, what's the typical order for taking a backup?",
    o: [
      "Plugins, then themes, then core",
      "Database first, then files",
      "Files first, then database",
      "Only files are needed"
    ],
    a: 1,
    t: "The guide suggests backing up the database first, then the files, and keeping the export with the file backup so they match.",
    p: "Save the words first, then the folders, and keep them together.",
    refs: ["https://developer.wordpress.org/advanced-administration/security/backup/"]
  },
  {
    id: "q-0182",
    s: "Debugging", d: 1, level: "Subscriber", stage: 3,
    q: "Which WP-CLI command deactivates every plugin at once, which helps when wp-admin is unreachable?",
    o: ["wp plugin deactivate --all", "wp plugin stop", "wp plugins off", "wp core disable-plugins"],
    a: 0,
    t: "wp plugin deactivate --all turns off every plugin. You can then reactivate them one at a time to find the culprit.",
    p: "Switch everything off, then back on one by one.",
    refs: ["https://developer.wordpress.org/cli/commands/plugin/deactivate/"]
  },
  {
    id: "q-0183",
    s: "Debugging", d: 1, level: "Subscriber", stage: 3,
    q: "Which WP-CLI command checks core files against the official checksums?",
    o: ["wp core verify-checksums", "wp core scan", "wp check files", "wp security verify"],
    a: 0,
    t: "wp core verify-checksums compares core files with WordPress.org checksums and reports changed or extra files.",
    p: "It checks whether WordPress's own files have been tampered with.",
    refs: ["https://developer.wordpress.org/cli/commands/core/verify-checksums/"]
  },
  {
    id: "q-0184",
    s: "Custom Development", d: 1, level: "Contributor", stage: 1,
    q: "A callback was added with add_action( 'init', 'my_fn', 20 ). What must remove_action() pass to remove it?",
    o: [
      "Only the hook name",
      "Any priority, it ignores it",
      "The same hook, callback and priority (20)",
      "The callback only"
    ],
    a: 2,
    t: "remove_action() must match the hook, the callback and the priority used when it was added, otherwise nothing is removed.",
    p: "To take a sticker off, you need to know exactly where it was stuck.",
    refs: ["https://developer.wordpress.org/reference/functions/remove_action/"]
  },
  {
    id: "q-0185",
    s: "Custom Development", d: 1, level: "Contributor", stage: 1,
    q: "Which function creates your own action hook that other code can attach to?",
    o: ["do_action()", "has_action()", "add_action()", "apply_filters()"],
    a: 0,
    t: "do_action( 'my_hook', $args ) fires the hook. add_action() attaches callbacks to it, and apply_filters() is the filter equivalent.",
    p: "It's you ringing a bell that others can respond to.",
    refs: ["https://developer.wordpress.org/reference/functions/do_action/"]
  },
  {
    id: "q-0186",
    s: "Custom Development", d: 1, level: "Contributor", stage: 1,
    q: "Which function lets other code change a value your plugin is about to use?",
    o: [
      "add_filter( 'my_filter', $value )",
      "remove_filter( 'my_filter' )",
      "apply_filters( 'my_filter', $value )",
      "do_action( 'my_filter', $value )"
    ],
    a: 2,
    t: "apply_filters() passes a value through every attached callback and returns the result.",
    p: "It passes the value around the room so others can tweak it before you use it.",
    refs: ["https://developer.wordpress.org/reference/functions/apply_filters/"]
  },
  {
    id: "q-0187",
    s: "Custom Development", d: 1, level: "Contributor", stage: 1,
    q: "Your filter callback needs the hook's second and third arguments, but only gets the first. What's missing?",
    o: [
      "A higher priority",
      "A return statement",
      "The accepted_args parameter of add_filter(), which defaults to 1",
      "A global variable"
    ],
    a: 2,
    t: "add_filter( $hook, $cb, $priority, $accepted_args ) passes only one argument unless accepted_args is raised.",
    p: "You have to tell WordPress how many items you want handed over.",
    refs: ["https://developer.wordpress.org/reference/functions/add_filter/"]
  },
  {
    id: "q-0188",
    s: "Security", d: 1, level: "Contributor", stage: 1,
    q: "You're printing a value inside a title=\"\" attribute. Which function escapes it?",
    o: ["esc_html()", "esc_js()", "esc_attr()", "esc_url()"],
    a: 2,
    t: "esc_attr() encodes quotes and other characters that would break out of an HTML attribute.",
    p: "Make sure the value can't break out of the quotes it sits in.",
    refs: [
      "https://developer.wordpress.org/reference/functions/esc_attr/",
      "https://developer.wordpress.org/apis/security/escaping/"
    ]
  },
  {
    id: "q-0189",
    s: "Security", d: 1, level: "Contributor", stage: 1,
    q: "Which function keeps only the HTML allowed in post content and strips the rest, such as <script>?",
    o: ["strip_tags()", "wp_kses_post()", "esc_html()", "sanitize_title()"],
    a: 1,
    t: "wp_kses_post() filters HTML through the list of tags and attributes allowed in post content.",
    p: "It keeps the safe formatting and throws out anything dangerous.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_kses_post/"]
  },
  {
    id: "q-0190",
    s: "Security", d: 1, level: "Contributor", stage: 1,
    q: "You receive a post ID from a form. Which function makes sure it's a non-negative whole number?",
    o: ["sanitize_text_field()", "absint()", "esc_attr()", "intval() never works"],
    a: 1,
    t: "absint() converts a value to a non-negative integer, which suits IDs.",
    p: "Force it into a plain positive number.",
    refs: ["https://developer.wordpress.org/reference/functions/absint/"]
  },
  {
    id: "q-0191",
    s: "Security", d: 1, level: "Contributor", stage: 1,
    q: "Which function cleans an email address before saving it?",
    o: ["is_email()", "sanitize_user()", "sanitize_email()", "esc_url()"],
    a: 2,
    t: "sanitize_email() strips characters not allowed in an email address. is_email() only checks whether it looks valid.",
    p: "One tidies it, the other just checks it.",
    refs: [
      "https://developer.wordpress.org/reference/functions/sanitize_email/",
      "https://developer.wordpress.org/reference/functions/is_email/"
    ]
  },
  {
    id: "q-0192",
    s: "Security", d: 1, level: "Contributor", stage: 1,
    q: "Which function turns a string into a safe lowercase key with only letters, numbers, dashes and underscores?",
    o: ["absint()", "sanitize_title()", "sanitize_key()", "esc_attr()"],
    a: 2,
    t: "sanitize_key() lowercases and removes anything other than a–z, 0–9, dashes and underscores, which suits option names and slugs used as keys.",
    p: "It turns any label into a safe, simple key.",
    refs: ["https://developer.wordpress.org/reference/functions/sanitize_key/"]
  },
  {
    id: "q-0193",
    s: "Security", d: 1, level: "Contributor", stage: 1,
    q: "Which function adds a nonce field to a form you build in wp-admin?",
    o: ["check_admin_referer()", "wp_nonce_field()", "wp_create_nonce() only", "wp_verify_nonce()"],
    a: 1,
    t: "wp_nonce_field() prints a hidden nonce input (and a referer field). check_admin_referer() verifies it on submit.",
    p: "It puts a one-time ticket in the form, to be checked when it comes back.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_nonce_field/",
      "https://developer.wordpress.org/apis/security/nonces/"
    ]
  },
  {
    id: "q-0194",
    s: "Security", d: 2, level: "Contributor", stage: 1,
    q: "By default, how long can a WordPress nonce stay valid?",
    o: ["5 minutes", "Up to 24 hours", "Exactly one use, then it expires", "Forever"],
    a: 1,
    t: "Nonces are tied to a 12-hour \"tick\" and accepted for the current and previous tick, so up to 24 hours by default. They aren't strictly single-use.",
    p: "It's a day pass, not a single-entry ticket.",
    refs: ["https://developer.wordpress.org/apis/security/nonces/"]
  },
  {
    id: "q-0195",
    s: "Security", d: 1, level: "Contributor", stage: 1,
    q: "A plugin settings page should only be usable by site administrators. Which check is the usual choice?",
    o: [
      "current_user_can( 'manage_options' )",
      "is_admin()",
      "current_user_can( 'read' )",
      "is_user_logged_in()"
    ],
    a: 0,
    t: "manage_options is the capability tied to site settings, held by Administrators by default.",
    p: "Ask for the \"can change site settings\" permission.",
    refs: ["https://developer.wordpress.org/reference/functions/current_user_can/"]
  },
  {
    id: "q-0196",
    s: "Security", d: 1, level: "Contributor", stage: 1,
    q: "After processing a form you redirect to a URL that came from the request. Which function limits redirects to allowed hosts?",
    o: ["wp_safe_redirect()", "header( 'Location' )", "home_url()", "wp_redirect()"],
    a: 0,
    t: "wp_safe_redirect() only allows the site's host (plus filtered hosts), which prevents open redirects. Call exit afterwards.",
    p: "It only sends people to places you trust.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_safe_redirect/"]
  },
  {
    id: "q-0197",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 1,
    q: "Which function tells you whether the visitor is logged in?",
    o: [
      "wp_get_current_user() returns false",
      "current_user_can( 'read' ) only",
      "is_user_logged_in()",
      "is_admin()"
    ],
    a: 2,
    t: "is_user_logged_in() returns true for any logged-in user. It says nothing about their permissions.",
    p: "It checks whether they've signed in, not what they're allowed to do.",
    refs: ["https://developer.wordpress.org/reference/functions/is_user_logged_in/"]
  },
  {
    id: "q-0198",
    s: "Custom Development", d: 1, level: "Contributor", stage: 1,
    q: "What's the difference between __() and _e()?",
    o: [
      "__() returns the translated string; _e() echoes it",
      "_e() is for errors only",
      "__() echoes; _e() returns",
      "They both escape HTML"
    ],
    a: 0,
    t: "Both translate. __() returns the string and _e() prints it. Neither escapes, so use esc_html__() and similar when outputting.",
    p: "One hands you the translation, the other says it out loud.",
    refs: [
      "https://developer.wordpress.org/reference/functions/__/",
      "https://developer.wordpress.org/reference/functions/_e/"
    ]
  },
  {
    id: "q-0199",
    s: "Custom Development", d: 1, level: "Contributor", stage: 1,
    q: "What should a plugin's text domain be?",
    o: [
      "The plugin's slug, such as my-plugin",
      "\"default\"",
      "The author's name",
      "The plugin's version number"
    ],
    a: 0,
    t: "The text domain must match the plugin slug so translations from WordPress.org load correctly.",
    p: "Label your words with the plugin's own name.",
    refs: [
      "https://developer.wordpress.org/plugins/internationalization/how-to-internationalize-your-plugin/"
    ]
  },
  {
    id: "q-0200",
    s: "Custom Development", d: 1, level: "Contributor", stage: 1,
    q: "Which function translates a string and escapes it for HTML, returning the result?",
    o: ["esc_html_e()", "esc_attr_e()", "__()", "esc_html__()"],
    a: 3,
    t: "esc_html__() returns a translated, HTML-escaped string. esc_html_e() echoes it instead.",
    p: "Translate and make safe in one step, then hand it back.",
    refs: ["https://developer.wordpress.org/reference/functions/esc_html__/"]
  },
  {
    id: "q-0201",
    s: "Custom Development", d: 1, level: "Contributor", stage: 1,
    q: "You need \"1 item\" or \"5 items\" depending on a number. Which function handles plurals?",
    o: ["__()", "_n()", "sprintf() alone", "_x()"],
    a: 1,
    t: "_n( $single, $plural, $number, $domain ) chooses the right form for each language, which may have more than two plural forms.",
    p: "Different languages count differently, so let WordPress pick the right word.",
    refs: ["https://developer.wordpress.org/reference/functions/_n/"]
  },
  {
    id: "q-0202",
    s: "Custom Development", d: 1, level: "Contributor", stage: 1,
    q: "What does wp_register_script() do on its own?",
    o: [
      "Adds the script to the database",
      "Minifies the script",
      "Defines a script so it can be enqueued later, without loading it",
      "Loads the script on every page"
    ],
    a: 2,
    t: "Registering only describes the script (handle, source, dependencies). It loads when something enqueues that handle.",
    p: "It puts the script on the menu; enqueueing orders it.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_register_script/"]
  },
  {
    id: "q-0203",
    s: "Custom Development", d: 1, level: "Contributor", stage: 1,
    q: "Your script needs jQuery loaded first. How do you declare that?",
    o: [
      "Load jQuery from a CDN in header.php",
      "Rename your file jquery.js",
      "Pass array( 'jquery' ) as the dependencies argument of wp_enqueue_script()",
      "Enqueue it with a lower priority number"
    ],
    a: 2,
    t: "The deps argument lists handles that must load first. WordPress orders the output to match.",
    p: "Tell WordPress what has to arrive before your script.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_enqueue_script/"]
  },
  {
    id: "q-0204",
    s: "Custom Development", d: 1, level: "Contributor", stage: 1,
    q: "Which hook do you use to enqueue CSS and JavaScript for wp-admin screens?",
    o: ["login_head", "admin_init", "admin_enqueue_scripts", "wp_enqueue_scripts"],
    a: 2,
    t: "admin_enqueue_scripts fires on admin pages and passes the screen's hook suffix, so you can load assets only where needed.",
    p: "There's a separate doorway for loading files into the dashboard.",
    refs: ["https://developer.wordpress.org/reference/hooks/admin_enqueue_scripts/"]
  },
  {
    id: "q-0205",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 1,
    q: "Which hook fires once every active plugin has been loaded?",
    o: ["wp_loaded", "plugins_loaded", "muplugins_loaded", "init"],
    a: 1,
    t: "plugins_loaded runs after all active plugins are included, so it's a safe place to check whether another plugin exists.",
    p: "It's the moment everyone has arrived.",
    refs: ["https://developer.wordpress.org/reference/hooks/plugins_loaded/"]
  },
  {
    id: "q-0206",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 2,
    q: "What does get_post_meta( $id, 'price', true ) return?",
    o: [
      "The meta ID",
      "An array of all values",
      "true or false",
      "A single value (or an empty string if missing)"
    ],
    a: 3,
    t: "With $single true it returns one value. With false it returns an array of every value stored under that key.",
    p: "The \"true\" means \"just give me one\".",
    refs: ["https://developer.wordpress.org/reference/functions/get_post_meta/"]
  },
  {
    id: "q-0207",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 2,
    q: "What happens if you call update_post_meta() for a key the post doesn't have yet?",
    o: ["It creates a new post", "It fails silently", "It throws an error", "It adds the meta"],
    a: 3,
    t: "update_post_meta() adds the field when it doesn't exist, so you don't need add_post_meta() first.",
    p: "If the box isn't there, it makes one.",
    refs: ["https://developer.wordpress.org/reference/functions/update_post_meta/"]
  },
  {
    id: "q-0208",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 2,
    q: "Which function removes a custom field from a post?",
    o: ["remove_post_meta()", "wp_delete_post()", "delete_post_meta()", "unset_post_meta()"],
    a: 2,
    t: "delete_post_meta( $post_id, $key, $value ) removes matching meta. wp_delete_post() removes the whole post.",
    p: "It empties one labelled box, not the whole post.",
    refs: ["https://developer.wordpress.org/reference/functions/delete_post_meta/"]
  },
  {
    id: "q-0209",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 2,
    q: "Where should you store a per-user setting, such as a preferred layout?",
    o: ["A site option", "A cookie only", "User meta, with update_user_meta()", "Post meta on the home page"],
    a: 2,
    t: "User meta (wp_usermeta) stores data per user. Options are site-wide.",
    p: "Save it on the person's own file, not on the noticeboard.",
    refs: [
      "https://developer.wordpress.org/reference/functions/update_user_meta/",
      "https://developer.wordpress.org/reference/functions/get_user_meta/"
    ]
  },
  {
    id: "q-0210",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 2,
    q: "Which WP_Query argument limits results to a custom post type such as \"book\"?",
    o: ["'name' => 'book'", "'category_name' => 'book'", "'post_type' => 'book'", "'type' => 'book'"],
    a: 2,
    t: "post_type accepts a type name or an array of them. The default is \"post\".",
    p: "Tell the query which kind of content to fetch.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_query/"]
  },
  {
    id: "q-0211",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 2,
    q: "Which WP_Query argument filters posts by custom field values?",
    o: ["field_query", "tax_query", "meta_query", "date_query"],
    a: 2,
    t: "meta_query takes an array of conditions on meta keys and values, with compare operators.",
    p: "It filters by the extra boxes attached to each post.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_query/"]
  },
  {
    id: "q-0212",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 2,
    q: "Which WP_Query argument filters posts by terms in a custom taxonomy?",
    o: ["term_query", "meta_query", "tax_query", "category__in only"],
    a: 2,
    t: "tax_query takes taxonomy, field, terms and operator for one or more taxonomies.",
    p: "It filters by labels such as categories or your own taxonomies.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_query/"]
  },
  {
    id: "q-0213",
    s: "WordPress Core", d: 2, level: "Contributor", stage: 2,
    q: "You want to sort products by a numeric \"price\" meta field. What do you pass?",
    o: [
      "'meta_value' => 'price'",
      "'order' => 'price'",
      "'meta_key' => 'price', 'orderby' => 'meta_value_num'",
      "'orderby' => 'price'"
    ],
    a: 2,
    t: "meta_value_num sorts numerically by the meta_key you name. meta_value would sort as text, putting \"100\" before \"20\".",
    p: "Tell it which box to sort by, and that it holds numbers.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_query/"]
  },
  {
    id: "q-0214",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 2,
    q: "Which function returns the full URL of a post?",
    o: ["home_url( $id )", "get_post_field( 'guid' )", "get_permalink()", "the_permalink()"],
    a: 2,
    t: "get_permalink() returns the URL. the_permalink() echoes it. The guid is not a reliable URL.",
    p: "It gives you the post's web address.",
    refs: ["https://developer.wordpress.org/reference/functions/get_permalink/"]
  },
  {
    id: "q-0215",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 2,
    q: "Which function returns the terms of a taxonomy attached to a post?",
    o: ["get_terms()", "get_the_terms()", "get_categories()", "get_term_link()"],
    a: 1,
    t: "get_the_terms( $post, $taxonomy ) returns the post's terms. get_terms() lists terms across the whole taxonomy.",
    p: "It lists the labels on this one post.",
    refs: ["https://developer.wordpress.org/reference/functions/get_the_terms/"]
  },
  {
    id: "q-0216",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 2,
    q: "Which function assigns terms to a post from code?",
    o: ["register_taxonomy()", "wp_set_object_terms()", "add_term()", "wp_insert_term()"],
    a: 1,
    t: "wp_set_object_terms() sets (or appends) terms on an object. wp_insert_term() creates a new term in a taxonomy.",
    p: "It sticks labels on a post.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_set_object_terms/"]
  },
  {
    id: "q-0217",
    s: "Custom Development", d: 1, level: "Contributor", stage: 2,
    q: "Your custom post type opens in the classic editor instead of the block editor. Which register_post_type() argument fixes it?",
    o: ["'hierarchical' => true", "'show_in_rest' => true", "'has_archive' => true", "'public' => true"],
    a: 1,
    t: "The block editor uses the REST API, so the post type must be exposed with show_in_rest and support the editor.",
    p: "The block editor talks through the REST API, so the post type has to be on it.",
    refs: ["https://developer.wordpress.org/reference/functions/register_post_type/"]
  },
  {
    id: "q-0218",
    s: "Custom Development", d: 1, level: "Contributor", stage: 2,
    q: "Which register_post_type() argument gives the post type its own archive page, such as /books/?",
    o: ["'public' => false", "'show_ui' => true", "'menu_position' => 5", "'has_archive' => true"],
    a: 3,
    t: "has_archive enables a post type archive, served by archive-{post_type}.php in classic themes.",
    p: "It creates a listing page for all items of that type.",
    refs: ["https://developer.wordpress.org/reference/functions/register_post_type/"]
  },
  {
    id: "q-0219",
    s: "Custom Development", d: 1, level: "Contributor", stage: 2,
    q: "Which register_post_type() argument controls editor features such as title, editor, thumbnail and excerpt?",
    o: ["supports", "capabilities", "taxonomies", "labels"],
    a: 0,
    t: "supports is an array of features (title, editor, thumbnail, excerpt, custom-fields and more).",
    p: "It ticks which boxes appear when editing that content.",
    refs: ["https://developer.wordpress.org/reference/functions/register_post_type/"]
  },
  {
    id: "q-0220",
    s: "Custom Development", d: 1, level: "Contributor", stage: 2,
    q: "How do you change the URL base of a custom post type from /book/ to /library/?",
    o: [
      "'menu_name' => 'library'",
      "'rewrite' => array( 'slug' => 'library' )",
      "'query_var' => 'library'",
      "'name' => 'library'"
    ],
    a: 1,
    t: "The rewrite slug sets the permalink base. Flush rewrite rules once afterwards (for example on activation).",
    p: "Change the word used in the address.",
    refs: ["https://developer.wordpress.org/reference/functions/register_post_type/"]
  },
  {
    id: "q-0221",
    s: "Performance", d: 1, level: "Contributor", stage: 2,
    q: "set_transient( 'stats', $data, HOUR_IN_SECONDS ) stores data for how long at most?",
    o: ["Forever", "One hour", "One minute", "One day"],
    a: 1,
    t: "The expiration is in seconds, and core time constants such as HOUR_IN_SECONDS help. Transients can still vanish earlier.",
    p: "It keeps it for up to an hour.",
    refs: ["https://developer.wordpress.org/apis/transients/"]
  },
  {
    id: "q-0222",
    s: "Performance", d: 1, level: "Contributor", stage: 2,
    q: "The source data behind a cached transient has changed. What do you call?",
    o: ["wp_cache_flush()", "delete_transient()", "flush_rewrite_rules()", "Nothing; it updates itself"],
    a: 1,
    t: "delete_transient() removes it, so the next request regenerates fresh data.",
    p: "Throw away the old copy so a fresh one gets made.",
    refs: ["https://developer.wordpress.org/reference/functions/delete_transient/"]
  },
  {
    id: "q-0223",
    s: "Custom Development", d: 1, level: "Contributor", stage: 2,
    q: "A shortcode's output appears at the top of the post instead of where the shortcode is. Why?",
    o: [
      "The shortcode name has a dash",
      "The callback echoes its output instead of returning it",
      "Shortcodes always render first",
      "It needs a higher priority"
    ],
    a: 1,
    t: "Shortcode callbacks must return a string. Echoing prints immediately, before the content is output.",
    p: "Hand the result back instead of shouting it early.",
    refs: ["https://developer.wordpress.org/reference/functions/add_shortcode/"]
  },
  {
    id: "q-0224",
    s: "Custom Development", d: 1, level: "Contributor", stage: 2,
    q: "What does shortcode_atts() do?",
    o: [
      "Runs shortcodes in a string",
      "Escapes the output",
      "Merges the user's attributes with your defaults and drops unknown ones",
      "Registers a shortcode"
    ],
    a: 2,
    t: "shortcode_atts( $defaults, $atts, $tag ) returns defaults overridden by provided attributes, ignoring keys you didn't define.",
    p: "It fills in blanks with defaults and ignores extras.",
    refs: ["https://developer.wordpress.org/reference/functions/shortcode_atts/"]
  },
  {
    id: "q-0225",
    s: "Custom Development", d: 1, level: "Contributor", stage: 2,
    q: "What's a good namespace for your plugin's custom REST routes?",
    o: ["No namespace", "'api'", "'wp/v2'", "A vendor-and-version namespace such as 'myplugin/v1'"],
    a: 3,
    t: "Namespaces separate your routes from core's wp/v2 and let you version them, for example /wp-json/myplugin/v1/items.",
    p: "Put your routes under your own name and version number.",
    refs: ["https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/"]
  },
  {
    id: "q-0226",
    s: "Custom Development", d: 1, level: "Contributor", stage: 2,
    q: "Which function wraps data so a REST callback returns a proper response object?",
    o: ["wp_die()", "json_encode() and echo", "rest_ensure_response()", "wp_send_json()"],
    a: 2,
    t: "rest_ensure_response() turns data into a WP_REST_Response (or passes through one or a WP_Error).",
    p: "It packages your answer in the format the API expects.",
    refs: ["https://developer.wordpress.org/reference/functions/rest_ensure_response/"]
  },
  {
    id: "q-0227",
    s: "WordPress Core", d: 1, level: "Contributor", stage: 2,
    q: "What's the core REST API path for listing posts?",
    o: ["/wp-json/wp/v2/posts", "/wp-admin/posts.json", "/api/posts", "/wp-json/posts/list"],
    a: 0,
    t: "Core routes live under the wp/v2 namespace, served from /wp-json/.",
    p: "It's the standard address for fetching posts as data.",
    refs: ["https://developer.wordpress.org/rest-api/reference/posts/"]
  },
  {
    id: "q-0228",
    s: "Custom Development", d: 1, level: "Contributor", stage: 2,
    q: "Which hook do you use to register custom REST routes?",
    o: ["admin_init", "init", "wp_loaded", "rest_api_init"],
    a: 3,
    t: "register_rest_route() should be called on rest_api_init.",
    p: "Register your API routes when the API is getting ready.",
    refs: [
      "https://developer.wordpress.org/reference/functions/register_rest_route/",
      "https://developer.wordpress.org/reference/hooks/rest_api_init/"
    ]
  },
  {
    id: "q-0229",
    s: "Debugging", d: 1, level: "Contributor", stage: 3,
    q: "Which PHP function writes a custom message to the error log?",
    o: ["print_r()", "var_dump()", "echo", "error_log()"],
    a: 3,
    t: "error_log() sends a message to the configured log. With WP_DEBUG_LOG on, that's debug.log.",
    p: "Write a note in the log instead of on the page.",
    refs: [
      "https://www.php.net/manual/en/function.error-log.php",
      "https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/"
    ]
  },
  {
    id: "q-0230",
    s: "Debugging", d: 1, level: "Contributor", stage: 3,
    q: "What does defining SAVEQUERIES as true do?",
    o: [
      "Logs queries to the browser console",
      "Caches every query",
      "Stores each database query, with its time and caller, in $wpdb->queries",
      "Disables the database"
    ],
    a: 2,
    t: "SAVEQUERIES records queries for analysis. It slows the site, so use it only while debugging.",
    p: "It keeps a list of every question asked of the database.",
    refs: ["https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/"]
  },
  {
    id: "q-0231",
    s: "Change Management", d: 1, level: "Contributor", stage: 3,
    q: "Which values does wp_get_environment_type() return?",
    o: ["true or false", "dev or live", "debug or release", "local, development, staging or production"],
    a: 3,
    t: "It reads WP_ENVIRONMENT_TYPE and defaults to production when it isn't set.",
    p: "It tells your code which kind of site it's running on.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_get_environment_type/"]
  },
  {
    id: "q-0232",
    s: "Debugging", d: 1, level: "Contributor", stage: 3,
    q: "Which WP-CLI command shows the value of an option such as siteurl?",
    o: ["wp config get siteurl", "wp option get siteurl", "wp get option siteurl", "wp site url"],
    a: 1,
    t: "wp option get reads an option from wp_options. wp config get reads constants from wp-config.php.",
    p: "Ask the command line for one setting.",
    refs: ["https://developer.wordpress.org/cli/commands/option/get/"]
  },
  {
    id: "q-0233",
    s: "Performance", d: 1, level: "Contributor", stage: 3,
    q: "Which WP-CLI command clears the object cache?",
    o: ["wp cache flush", "wp cache clear-all", "wp object-cache purge", "wp flush"],
    a: 0,
    t: "wp cache flush empties the object cache (with a persistent cache, for every site using it).",
    p: "Empty the short-term memory in one command.",
    refs: ["https://developer.wordpress.org/cli/commands/cache/flush/"]
  },
  {
    id: "q-0234",
    s: "Performance", d: 1, level: "Contributor", stage: 3,
    q: "Which WP-CLI command deletes every transient?",
    o: [
      "wp transient delete --all",
      "wp option delete transients",
      "wp cache flush --transients",
      "wp transient purge"
    ],
    a: 0,
    t: "wp transient delete --all removes transients from the database. Use --expired to remove only expired ones.",
    p: "Clear out all the temporary saved data.",
    refs: ["https://developer.wordpress.org/cli/commands/transient/delete/"]
  },
  {
    id: "q-0235",
    s: "Debugging", d: 1, level: "Contributor", stage: 3,
    q: "Which WP-CLI command regenerates rewrite rules?",
    o: ["wp rewrite flush", "wp permalink reset", "wp cache flush", "wp rewrite clear"],
    a: 0,
    t: "wp rewrite flush rebuilds rewrite rules, the same as saving Settings → Permalinks.",
    p: "Rebuild the address rules from the command line.",
    refs: ["https://developer.wordpress.org/cli/commands/rewrite/flush/"]
  },
  {
    id: "q-0236",
    s: "Debugging", d: 1, level: "Contributor", stage: 3,
    q: "Which WP-CLI command lists pages?",
    o: ["wp list pages", "wp page list", "wp post pages", "wp post list --post_type=page"],
    a: 3,
    t: "wp post list accepts WP_Query-style filters such as --post_type and --post_status.",
    p: "List content of a chosen type from the command line.",
    refs: ["https://developer.wordpress.org/cli/commands/post/list/"]
  },
  {
    id: "q-0237",
    s: "Custom Development", d: 1, level: "Contributor", stage: 3,
    q: "Which WP-CLI command creates a starter plugin with files and tests?",
    o: ["wp plugin create", "wp new plugin", "wp scaffold plugin", "wp init plugin"],
    a: 2,
    t: "wp scaffold plugin generates a plugin skeleton, optionally with PHPUnit test files.",
    p: "It builds the empty frame of a new plugin for you.",
    refs: ["https://developer.wordpress.org/cli/commands/scaffold/plugin/"]
  },
  {
    id: "q-0238",
    s: "Change Management", d: 1, level: "Contributor", stage: 3,
    q: "Which Git command creates a new branch and switches to it?",
    o: ["git merge feature-x", "git switch -c feature-x", "git push feature-x", "git branch -d feature-x"],
    a: 1,
    t: "git switch -c (or git checkout -b) creates and checks out a branch in one step.",
    p: "Start a separate line of work without touching the main one.",
    refs: ["https://git-scm.com/docs/git-switch"]
  },
  {
    id: "q-0239",
    s: "Change Management", d: 1, level: "Contributor", stage: 3,
    q: "You have uncommitted changes and need to switch tasks quickly. Which command shelves them?",
    o: ["git stash", "git clean -fd", "git reset --hard", "git revert"],
    a: 0,
    t: "git stash saves uncommitted changes and restores a clean working tree. git stash pop brings them back. reset --hard throws them away.",
    p: "Put your work in a drawer to finish later.",
    refs: ["https://git-scm.com/docs/git-stash"]
  },
  {
    id: "q-0240",
    s: "Change Management", d: 1, level: "Contributor", stage: 3,
    q: "With a composer.lock file present, what does composer install do?",
    o: [
      "Updates every package to the newest version",
      "Installs only dev packages",
      "Deletes the lock file",
      "Installs the exact versions recorded in the lock file"
    ],
    a: 3,
    t: "composer install reads composer.lock for reproducible installs. composer update resolves new versions and rewrites the lock.",
    p: "Everyone gets the same versions, every time.",
    refs: ["https://getcomposer.org/doc/01-basic-usage.md"]
  },
  {
    id: "q-0241",
    s: "Change Management", d: 1, level: "Contributor", stage: 3,
    q: "Which plugin header stops activation on servers running an older PHP version?",
    o: ["Version", "Tested up to", "Stable tag", "Requires PHP"],
    a: 3,
    t: "Requires PHP (and Requires at least for WordPress) are read from the main plugin file, and WordPress blocks activation if they aren't met.",
    p: "It tells WordPress which PHP the plugin needs.",
    refs: ["https://developer.wordpress.org/plugins/plugin-basics/header-requirements/"]
  },
  {
    id: "q-0242",
    s: "Change Management", d: 1, level: "Contributor", stage: 3,
    q: "Which plugin header sets the minimum WordPress version the plugin needs?",
    o: ["Requires at least", "Network", "Tested up to", "Requires PHP"],
    a: 0,
    t: "Requires at least is checked against the installed WordPress version before activation.",
    p: "It says how new WordPress must be.",
    refs: ["https://developer.wordpress.org/plugins/plugin-basics/header-requirements/"]
  },
  {
    id: "q-0243",
    s: "Change Management", d: 1, level: "Contributor", stage: 3,
    q: "In a WordPress.org plugin readme.txt, what does \"Stable tag\" point to?",
    o: [
      "The version (tag) users should download",
      "The plugin author",
      "The minimum PHP version",
      "The newest WordPress tested"
    ],
    a: 0,
    t: "Stable tag tells the directory which tagged version to serve. It should match the released version.",
    p: "It points the directory at the release people should get.",
    refs: ["https://developer.wordpress.org/plugins/wordpress-org/how-your-readme-txt-works/"]
  },
  {
    id: "q-0244",
    s: "Custom Development", d: 1, level: "Contributor", stage: 3,
    q: "When does a plugin's uninstall.php run?",
    o: [
      "When it's updated",
      "When it's deactivated",
      "When the plugin is deleted from the Plugins screen",
      "On every page load"
    ],
    a: 2,
    t: "uninstall.php (or register_uninstall_hook) runs on deletion, which is where permanent clean-up belongs. Deactivation shouldn't delete user data.",
    p: "Clean up when they throw it away, not when they just switch it off.",
    refs: ["https://developer.wordpress.org/plugins/plugin-basics/uninstall-methods/"]
  },
  {
    id: "q-0245",
    s: "Custom Development", d: 1, level: "Contributor", stage: 3,
    q: "Which function runs code when a plugin is deactivated?",
    o: [
      "deactivate_plugins()",
      "register_deactivation_hook()",
      "register_uninstall_hook()",
      "remove_action()"
    ],
    a: 1,
    t: "register_deactivation_hook() suits temporary clean-up such as clearing scheduled events or flushing rewrite rules.",
    p: "It's the plugin's \"switching off\" step.",
    refs: ["https://developer.wordpress.org/reference/functions/register_deactivation_hook/"]
  },
  {
    id: "q-0246",
    s: "Custom Development", d: 2, level: "Contributor", stage: 3,
    q: "Which function creates or updates a plugin's custom database table from a CREATE TABLE statement?",
    o: ["dbDelta()", "maybe_create_table() is required", "add_option()", "$wpdb->query() only"],
    a: 0,
    t: "dbDelta() compares the statement with the existing table and applies the changes. It has strict formatting rules.",
    p: "It builds the table, or adjusts it if it already exists.",
    refs: [
      "https://developer.wordpress.org/reference/functions/dbDelta/",
      "https://developer.wordpress.org/plugins/creating-tables-with-plugins/"
    ]
  },
  {
    id: "q-0247",
    s: "Custom Development", d: 1, level: "Contributor", stage: 3,
    q: "Why should a custom table name use $wpdb->prefix?",
    o: [
      "It encrypts the table",
      "Sites can use a table prefix other than wp_, and multisite uses one per site",
      "It makes queries faster",
      "It's needed for indexes"
    ],
    a: 1,
    t: "$wpdb->prefix holds the site's prefix, so the table name matches the install and each multisite site.",
    p: "Use the site's own name tag on your table.",
    refs: ["https://developer.wordpress.org/plugins/creating-tables-with-plugins/"]
  },
  {
    id: "q-0248",
    s: "Performance", d: 1, level: "Contributor", stage: 3,
    q: "Which function registers an extra image size that WordPress generates on upload?",
    o: ["set_post_thumbnail_size() only", "add_image_size()", "image_resize()", "wp_get_attachment_image()"],
    a: 1,
    t: "add_image_size( $name, $width, $height, $crop ) adds a size for new uploads. Existing images need regenerating.",
    p: "Ask WordPress to make one more copy of each upload at a set size.",
    refs: ["https://developer.wordpress.org/reference/functions/add_image_size/"]
  },
  {
    id: "q-0249",
    s: "Performance", d: 1, level: "Contributor", stage: 3,
    q: "Since WordPress 5.5, what does core add to most images by default?",
    o: ["WebP conversion", "A watermark", "An inline base64 copy", "loading=\"lazy\""],
    a: 3,
    t: "Core adds loading=\"lazy\" to images so the browser can defer off-screen images. wp_lazy_loading_enabled() controls it.",
    p: "Pictures further down load only when you scroll near them.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_lazy_loading_enabled/"]
  },
  {
    id: "q-0250",
    s: "Performance", d: 1, level: "Contributor", stage: 3,
    q: "What does wp_cache_get() return when the key isn't in the cache?",
    o: ["false", "It throws an exception", "null", "An empty string"],
    a: 0,
    t: "A miss returns false (the $found parameter tells a miss apart from a stored false).",
    p: "It returns \"nothing found\", so you know to build the value.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_cache_get/"]
  },
  {
    id: "q-0251",
    s: "Performance", d: 2, level: "Contributor", stage: 3,
    q: "Which WP-CLI command lists only the options that autoload?",
    o: ["wp db autoload", "wp option list --autoload=on", "wp option list --heavy", "wp option autoload"],
    a: 1,
    t: "wp option list accepts --autoload to filter by autoload value, which helps find large autoloaded options.",
    p: "List only the settings loaded on every page.",
    refs: ["https://developer.wordpress.org/cli/commands/option/list/"]
  },
  {
    id: "q-0252",
    s: "Debugging", d: 1, level: "Contributor", stage: 3,
    q: "Which function stops execution and shows a WordPress-styled message, for example after a failed permission check?",
    o: ["wp_die()", "wp_error()", "die_message()", "exit_page()"],
    a: 0,
    t: "wp_die() ends the request with a formatted message (and a status code when given). In AJAX it returns a plain response.",
    p: "Stop right there and show a polite message.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_die/"]
  },
  {
    id: "q-0253",
    s: "Security", d: 2, level: "Author", stage: 1,
    q: "In register_post_meta(), what does auth_callback control?",
    o: [
      "Whether the meta is shown on the front end",
      "Whether it autoloads",
      "Whether the current user may edit that meta (for example through the REST API)",
      "How the value is sanitized"
    ],
    a: 2,
    t: "auth_callback decides whether a user can add, edit or delete the meta key. sanitize_callback cleans the value.",
    p: "It's the bouncer for who may change that field.",
    refs: [
      "https://developer.wordpress.org/reference/functions/register_post_meta/",
      "https://developer.wordpress.org/reference/functions/register_meta/"
    ]
  },
  {
    id: "q-0254",
    s: "Custom Development", d: 2, level: "Author", stage: 1,
    q: "In block.json, what does the \"attributes\" property define?",
    o: [
      "The block's CSS classes",
      "The data the block stores, with types and where it's read from",
      "The block's REST route",
      "Which users can insert the block"
    ],
    a: 1,
    t: "Attributes describe the block's data (type, default, source). The editor reads and saves them.",
    p: "They're the block's settings and content fields.",
    refs: [
      "https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/",
      "https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/"
    ]
  },
  {
    id: "q-0255",
    s: "Custom Development", d: 2, level: "Author", stage: 1,
    q: "In a block's edit component, what is useBlockProps() for?",
    o: [
      "Adding the props the editor needs (classes, data attributes, events) to the block's wrapper element",
      "Registering the block",
      "Saving to the database",
      "Fetching posts"
    ],
    a: 0,
    t: "useBlockProps() returns the attributes the editor needs on the outer element. useBlockProps.save() does the same in save().",
    p: "It wires the block's outer box into the editor.",
    refs: ["https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/"]
  },
  {
    id: "q-0256",
    s: "Custom Development", d: 2, level: "Author", stage: 1,
    q: "Which package gives you build, start and lint commands for blocks without writing your own webpack config?",
    o: ["@wordpress/scripts", "@wordpress/hooks", "@wordpress/data", "@wordpress/env"],
    a: 0,
    t: "@wordpress/scripts (wp-scripts) wraps webpack, Babel, ESLint and more with WordPress defaults. @wordpress/env runs local environments.",
    p: "It's a ready-made build toolkit for blocks.",
    refs: ["https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/"]
  },
  {
    id: "q-0257",
    s: "Custom Development", d: 2, level: "Author", stage: 1,
    q: "Which PHP filter lets you change the HTML of any block as it's rendered on the front end?",
    o: ["block_type_metadata", "render_block", "pre_render_block_editor", "the_content only"],
    a: 1,
    t: "render_block filters each block's rendered output and receives the block data. render_block_{name} targets one block type.",
    p: "It lets you edit each block's HTML on its way to the page.",
    refs: ["https://developer.wordpress.org/reference/hooks/render_block/"]
  },
  {
    id: "q-0258",
    s: "Custom Development", d: 2, level: "Author", stage: 1,
    q: "You want your custom block to get the editor's colour and spacing controls automatically. What do you use?",
    o: [
      "A custom inspector panel only",
      "The \"supports\" property in block.json",
      "register_block_style()",
      "theme.json alone"
    ],
    a: 1,
    t: "Block supports (color, spacing, typography and more) add standard controls and apply the styles for you.",
    p: "Tick the features you want, and the editor adds the controls.",
    refs: ["https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/"]
  },
  {
    id: "q-0259",
    s: "Custom Development", d: 2, level: "Author", stage: 1,
    q: "Which PHP function registers a block pattern from code?",
    o: [
      "register_block_type()",
      "register_block_style()",
      "register_block_pattern()",
      "add_theme_support( 'patterns' )"
    ],
    a: 2,
    t: "register_block_pattern( $name, $properties ) adds a pattern. Themes can also place pattern files in /patterns.",
    p: "It adds a ready-made layout to the inserter.",
    refs: ["https://developer.wordpress.org/reference/functions/register_block_pattern/"]
  },
  {
    id: "q-0260",
    s: "Custom Development", d: 2, level: "Author", stage: 1,
    q: "What does register_block_style() add to a block?",
    o: [
      "A new block variation with different defaults",
      "A new block attribute",
      "An alternative style the user can pick, applied as an is-style-{name} class",
      "Inline styles on every instance"
    ],
    a: 2,
    t: "Block styles add a CSS class option. Variations are different: they preset attributes and inner blocks.",
    p: "It adds another look the user can switch to.",
    refs: ["https://developer.wordpress.org/reference/functions/register_block_style/"]
  },
  {
    id: "q-0261",
    s: "Custom Development", d: 2, level: "Author", stage: 1,
    q: "Strings in your block's JavaScript aren't being translated. What's missing?",
    o: [
      "load_plugin_textdomain() in JavaScript",
      "A call to wp_set_script_translations() for the script handle",
      "A second text domain",
      "Escaping"
    ],
    a: 1,
    t: "wp_set_script_translations() tells WordPress to load JSON translation files for that script.",
    p: "The script needs its own translations loaded.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_set_script_translations/"]
  },
  {
    id: "q-0262",
    s: "Custom Development", d: 2, level: "Author", stage: 1,
    q: "Which filter lets a plugin swap the template file WordPress is about to load?",
    o: ["template_redirect", "the_template", "get_template_part", "template_include"],
    a: 3,
    t: "template_include receives the chosen template path, and you can return a different one. template_redirect is an action that fires earlier.",
    p: "It lets you change which page layout file gets used.",
    refs: ["https://developer.wordpress.org/reference/hooks/template_include/"]
  },
  {
    id: "q-0263",
    s: "WordPress Core", d: 2, level: "Author", stage: 1,
    q: "Which function returns the slug of the custom template assigned to a page?",
    o: ["get_page_template()", "get_template()", "is_page_template() only", "get_page_template_slug()"],
    a: 3,
    t: "get_page_template_slug() returns the template file assigned in the editor, or an empty string for the default.",
    p: "It tells you which special layout a page uses.",
    refs: ["https://developer.wordpress.org/reference/functions/get_page_template_slug/"]
  },
  {
    id: "q-0264",
    s: "Performance", d: 2, level: "Author", stage: 1,
    q: "You only need post IDs from a query. Which argument avoids loading full post objects?",
    o: [
      "'cache_results' => false",
      "'suppress_filters' => true",
      "'posts_per_page' => 1",
      "'fields' => 'ids'"
    ],
    a: 3,
    t: "fields => ids selects only IDs, which uses less memory and fewer queries.",
    p: "Ask for the list of numbers, not every full record.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_query/"]
  },
  {
    id: "q-0265",
    s: "WordPress Core", d: 2, level: "Author", stage: 1,
    q: "You pass post__in with IDs in a specific order. How do you keep that order?",
    o: ["It always keeps it", "'orderby' => 'post__in'", "'order' => 'ASC'", "'orderby' => 'ID'"],
    a: 1,
    t: "By default results are ordered by date. orderby => post__in preserves the order of the array.",
    p: "Tell the query to keep your list's order.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_query/"]
  },
  {
    id: "q-0266",
    s: "Custom Development", d: 2, level: "Author", stage: 1,
    q: "You call wp_insert_post( $args, true ). What do you check before using the result?",
    o: [
      "The global $post",
      "Whether it returned 1",
      "Nothing; it always works",
      "is_wp_error() on the return value"
    ],
    a: 3,
    t: "With $wp_error true it returns a WP_Error on failure instead of 0, so check is_wp_error().",
    p: "Check whether you got an ID or an error before carrying on.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_insert_post/",
      "https://developer.wordpress.org/reference/functions/is_wp_error/"
    ]
  },
  {
    id: "q-0267",
    s: "Custom Development", d: 2, level: "Author", stage: 1,
    q: "What does the $capability argument of add_submenu_page() do?",
    o: [
      "Hides the page and blocks access for users without that capability",
      "Sets the menu position",
      "Sets the menu icon",
      "Nothing; it's a label"
    ],
    a: 0,
    t: "Only users with the capability see the menu item and can open the page.",
    p: "Only people with the right permission get through that door.",
    refs: ["https://developer.wordpress.org/reference/functions/add_submenu_page/"]
  },
  {
    id: "q-0268",
    s: "Custom Development", d: 2, level: "Author", stage: 1,
    q: "With the Settings API, how do fields added with add_settings_field() appear on your page?",
    o: [
      "Through the REST API only",
      "They print when you call do_settings_sections() for that page",
      "Only via a shortcode",
      "Automatically in Settings → General"
    ],
    a: 1,
    t: "Sections and fields attach to a page slug. do_settings_sections() outputs them, and settings_fields() adds the hidden fields.",
    p: "You place them on the page by calling the function that prints them.",
    refs: [
      "https://developer.wordpress.org/reference/functions/add_settings_field/",
      "https://developer.wordpress.org/reference/functions/do_settings_sections/"
    ]
  },
  {
    id: "q-0269",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "What does wp_verify_nonce() return for a valid nonce?",
    o: [
      "1 or 2, depending on which 12-hour half it was created in",
      "The nonce string",
      "The user ID",
      "Always true"
    ],
    a: 0,
    t: "It returns 1 (current tick) or 2 (previous tick) when valid, and false when invalid.",
    p: "It says \"valid, and fairly fresh\" or \"valid, but older\".",
    refs: ["https://developer.wordpress.org/reference/functions/wp_verify_nonce/"]
  },
  {
    id: "q-0270",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "A REST route is meant to be public. What should its permission_callback be?",
    o: ["is_user_logged_in", "__return_true, stated explicitly", "null", "Left out"],
    a: 1,
    t: "Public routes should set permission_callback to __return_true. Leaving it out triggers a notice since WordPress 5.5.",
    p: "Say clearly \"anyone may use this\", rather than forgetting to say anything.",
    refs: ["https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/"]
  },
  {
    id: "q-0271",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "In register_rest_route() args, what are validate_callback and sanitize_callback for?",
    o: [
      "Formatting the response",
      "Logging requests",
      "Caching the route",
      "Rejecting bad input with an error, and cleaning accepted input"
    ],
    a: 3,
    t: "validate_callback returns true or an error. sanitize_callback transforms the value before your callback gets it.",
    p: "One checks the input is acceptable, the other tidies it.",
    refs: ["https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/"]
  },
  {
    id: "q-0272",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "You need to save a URL to the database (not print it). Which function cleans it?",
    o: ["esc_url_raw() (or sanitize_url())", "esc_url()", "esc_attr()", "urlencode()"],
    a: 0,
    t: "esc_url_raw() cleans a URL without HTML-encoding it, which suits storage and redirects. esc_url() is for display.",
    p: "Clean it for storage, and save the display-safe version for output.",
    refs: ["https://developer.wordpress.org/reference/functions/esc_url_raw/"]
  },
  {
    id: "q-0273",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "You want to allow only <a href> and <strong> in a field. Which function fits?",
    o: [
      "strip_tags() with no list",
      "esc_html()",
      "wp_kses_post()",
      "wp_kses() with your own allowed-tags array"
    ],
    a: 3,
    t: "wp_kses( $html, $allowed ) keeps only the tags and attributes you list.",
    p: "Write your own short list of allowed formatting.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_kses/"]
  },
  {
    id: "q-0274",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "On a single site, which default roles have the unfiltered_html capability?",
    o: ["All logged-in users", "Administrators and Editors", "Nobody", "Authors and Contributors"],
    a: 1,
    t: "Editors and Administrators can post unfiltered HTML on a single site. On multisite only Super Admins have it.",
    p: "Only trusted staff can paste raw code into posts.",
    refs: ["https://wordpress.org/documentation/article/roles-and-capabilities/"]
  },
  {
    id: "q-0275",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "How should a plugin check a password a user typed against a stored hash?",
    o: ["Store and compare plain text", "Compare md5() values", "Use == on the hash", "wp_check_password()"],
    a: 3,
    t: "wp_check_password() verifies against the stored hash using WordPress's hashing. Never store plain passwords.",
    p: "Let WordPress compare it safely.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_check_password/",
      "https://developer.wordpress.org/reference/functions/wp_hash_password/"
    ]
  },
  {
    id: "q-0276",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "Why use $wpdb->insert() instead of building an INSERT string yourself?",
    o: [
      "It skips the database",
      "It caches the row",
      "It's the only way to insert",
      "It prepares and escapes the values for you"
    ],
    a: 3,
    t: "$wpdb->insert( $table, $data, $format ) builds a prepared statement, avoiding SQL injection mistakes.",
    p: "It handles the dangerous quoting for you.",
    refs: ["https://developer.wordpress.org/reference/classes/wpdb/insert/"]
  },
  {
    id: "q-0277",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "Which function checks an uploaded file's real type and extension before you accept it?",
    o: ["pathinfo()", "is_uploaded_file() only", "sanitize_file_name() only", "wp_check_filetype_and_ext()"],
    a: 3,
    t: "wp_check_filetype_and_ext() checks the extension against allowed MIME types and inspects the file contents.",
    p: "Check what the file really is, not just its name.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_check_filetype_and_ext/"]
  },
  {
    id: "q-0278",
    s: "Security", d: 2, level: "Author", stage: 2,
    q: "Which measures help against brute-force login attacks?",
    o: [
      "Hiding the login button with CSS",
      "Using the username admin",
      "Limiting login attempts and adding two-factor authentication",
      "Turning off HTTPS"
    ],
    a: 2,
    t: "Rate limiting, strong passwords and 2FA make guessing passwords impractical.",
    p: "Slow down the guessers and add a second lock.",
    refs: ["https://developer.wordpress.org/advanced-administration/security/brute-force/"]
  },
  {
    id: "q-0279",
    s: "Performance", d: 2, level: "Author", stage: 2,
    q: "A \"latest posts\" query keeps showing a sticky post first. Which argument stops that?",
    o: [
      "'post__not_in' => get_option( 'sticky_posts' ) is required",
      "'ignore_sticky_posts' => true",
      "'no_found_rows' => true",
      "'orderby' => 'date'"
    ],
    a: 1,
    t: "ignore_sticky_posts stops sticky posts being moved to the front. They can still appear in their normal date order.",
    p: "Tell the query to stop putting pinned posts first.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_query/"]
  },
  {
    id: "q-0280",
    s: "Performance", d: 2, level: "Author", stage: 2,
    q: "What's the difference between wp_cache_add() and wp_cache_set()?",
    o: [
      "add only stores if the key doesn't exist; set always overwrites",
      "add is persistent, set isn't",
      "They're identical",
      "set only works in admin"
    ],
    a: 0,
    t: "wp_cache_add() returns false if the key already exists. wp_cache_set() replaces any value.",
    p: "One only fills an empty slot, the other always overwrites.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_cache_add/",
      "https://developer.wordpress.org/reference/functions/wp_cache_set/"
    ]
  },
  {
    id: "q-0281",
    s: "Performance", d: 2, level: "Author", stage: 2,
    q: "A cached value depends on a post. What do you do when that post is saved?",
    o: [
      "Wait for the cache to expire",
      "Delete the key with wp_cache_delete() on save_post",
      "Nothing",
      "Flush the whole cache"
    ],
    a: 1,
    t: "Invalidate the specific key when its source changes. Flushing everything hurts other cached data.",
    p: "Throw away just the out-of-date copy.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_cache_delete/",
      "https://developer.wordpress.org/reference/hooks/save_post/"
    ]
  },
  {
    id: "q-0282",
    s: "Performance", d: 2, level: "Author", stage: 2,
    q: "With a persistent object cache active, where are transients stored?",
    o: [
      "In the browser",
      "In the filesystem",
      "Always in wp_options",
      "In the object cache instead of wp_options"
    ],
    a: 3,
    t: "With an external object cache, transients use it, so they may be evicted at any time.",
    p: "They live in the fast short-term memory instead of the database.",
    refs: ["https://developer.wordpress.org/apis/transients/"]
  },
  {
    id: "q-0283",
    s: "Performance", d: 2, level: "Author", stage: 2,
    q: "A loop calls get_post_meta() for 50 posts and runs 50 queries. What reduces that to one?",
    o: [
      "Use a shortcode",
      "Add an index to wp_options",
      "Prime the meta cache first with update_meta_cache() (WP_Query does this by default)",
      "Increase memory"
    ],
    a: 2,
    t: "Loading meta for all IDs in one query fills the cache, so later get_post_meta() calls hit memory.",
    p: "Fetch everything in one trip instead of 50.",
    refs: ["https://developer.wordpress.org/reference/functions/update_meta_cache/"]
  },
  {
    id: "q-0284",
    s: "Performance", d: 2, level: "Author", stage: 2,
    q: "After wp_remote_get(), which function gives you the HTTP status code?",
    o: [
      "$response['status'] always",
      "wp_remote_status()",
      "wp_remote_retrieve_response_code()",
      "http_response_code()"
    ],
    a: 2,
    t: "Check is_wp_error() first, then read the code with wp_remote_retrieve_response_code() and the body with wp_remote_retrieve_body().",
    p: "Check whether the other server said \"OK\" before using the answer.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_remote_retrieve_response_code/"]
  },
  {
    id: "q-0285",
    s: "Performance", d: 2, level: "Author", stage: 2,
    q: "On a low-traffic site, scheduled tasks run late or not at all. What's the robust fix?",
    o: [
      "Add more plugins",
      "Call wp_cron() in the theme",
      "Shorten every interval",
      "Set DISABLE_WP_CRON and trigger wp-cron.php from the server's real scheduler"
    ],
    a: 3,
    t: "WP-Cron only runs on page loads. A system cron makes timing reliable.",
    p: "Use a real clock instead of waiting for visitors to nudge it.",
    refs: ["https://developer.wordpress.org/plugins/cron/hooking-wp-cron-into-the-system-task-scheduler/"]
  },
  {
    id: "q-0286",
    s: "Debugging", d: 2, level: "Author", stage: 3,
    q: "Which Query Monitor panel helps you see which callbacks are attached to each hook on a page?",
    o: ["Environment", "Languages", "Hooks & Actions", "Transients"],
    a: 2,
    t: "Query Monitor's Hooks & Actions panel lists hooks fired during the request and their callbacks, with priorities.",
    p: "It shows which pieces of code reacted at each moment.",
    refs: ["https://wordpress.org/plugins/query-monitor/"]
  },
  {
    id: "q-0287",
    s: "Debugging", d: 2, level: "Author", stage: 3,
    q: "Your plugin gets called incorrectly by other code. Which function triggers a developer notice without breaking the site?",
    o: ["_doing_it_wrong()", "trigger_error() with E_USER_ERROR", "wp_die()", "exit()"],
    a: 0,
    t: "_doing_it_wrong() shows a notice when WP_DEBUG is on, naming the function and the version.",
    p: "It warns developers without stopping visitors.",
    refs: ["https://developer.wordpress.org/reference/functions/_doing_it_wrong/"]
  },
  {
    id: "q-0288",
    s: "Change Management", d: 2, level: "Author", stage: 3,
    q: "You're replacing a public plugin function with a new one. How do you warn developers still using the old one?",
    o: [
      "Rename it silently",
      "Add a comment only",
      "Keep it, call _deprecated_function() inside it, and forward to the new function",
      "Delete it in a patch release"
    ],
    a: 2,
    t: "_deprecated_function() logs a notice with WP_DEBUG on, giving developers time before a major release removes it.",
    p: "Keep the old door open for a while, with a sign pointing to the new one.",
    refs: ["https://developer.wordpress.org/reference/functions/_deprecated_function/"]
  },
  {
    id: "q-0289",
    s: "Debugging", d: 2, level: "Author", stage: 3,
    q: "Which WP-CLI command runs a line of PHP in the WordPress context?",
    o: ["wp eval 'echo get_option( \"home\" );'", "wp run", "wp php", "wp exec-php"],
    a: 0,
    t: "wp eval loads WordPress and runs the code. wp eval-file runs a file, and wp shell opens an interactive session.",
    p: "Run a quick snippet with WordPress already loaded.",
    refs: ["https://developer.wordpress.org/cli/commands/eval/"]
  },
  {
    id: "q-0290",
    s: "Debugging", d: 2, level: "Author", stage: 3,
    q: "Which WP-CLI command opens an interactive PHP session with WordPress loaded?",
    o: ["wp repl", "wp console", "wp shell", "wp debug"],
    a: 2,
    t: "wp shell starts a REPL where you can call WordPress functions line by line.",
    p: "It's a live chat with WordPress's code.",
    refs: ["https://developer.wordpress.org/cli/commands/shell/"]
  },
  {
    id: "q-0291",
    s: "Debugging", d: 2, level: "Author", stage: 3,
    q: "Which tool lets you pause PHP on a breakpoint and inspect variables in your IDE?",
    o: ["WP_DEBUG_LOG", "Query Monitor", "Xdebug step debugging", "PHPCS"],
    a: 2,
    t: "Xdebug's step debugger connects to an IDE so you can pause, step through code and inspect state.",
    p: "It lets you freeze the code mid-run and look around.",
    refs: ["https://xdebug.org/docs/step_debug"]
  },
  {
    id: "q-0292",
    s: "Change Management", d: 2, level: "Author", stage: 3,
    q: "In WordPress's PHPUnit test suite, what do test factories such as self::factory()->post->create() do?",
    o: [
      "Create test data (posts, users, terms) in the test database",
      "Mock HTTP calls automatically",
      "Deploy code",
      "Run the linter"
    ],
    a: 0,
    t: "Factories quickly create fixtures. Each test runs in a transaction that rolls back afterwards.",
    p: "They make fake posts and users for the test, then tidy up.",
    refs: ["https://make.wordpress.org/core/handbook/testing/automated-testing/phpunit/"]
  },
  {
    id: "q-0293",
    s: "Change Management", d: 2, level: "Author", stage: 3,
    q: "Which official package spins up a local WordPress environment with Docker from a .wp-env.json file?",
    o: ["@wordpress/env (wp-env)", "Composer", "WP-CLI scaffold", "@wordpress/scripts"],
    a: 0,
    t: "wp-env starts WordPress and a database in Docker, mapping your plugin or theme into it.",
    p: "One command gives you a local test site.",
    refs: ["https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/"]
  },
  {
    id: "q-0294",
    s: "Disaster Recovery", d: 2, level: "Author", stage: 3,
    q: "Why shouldn't you copy a staging database over production on a live shop?",
    o: [
      "Staging databases are larger",
      "It would erase orders, users and comments created on production since staging was copied",
      "It's slower than files",
      "WordPress forbids it"
    ],
    a: 1,
    t: "Production keeps changing. Move code forward and apply schema or settings changes deliberately instead of overwriting live data.",
    p: "You'd paste last week's notebook over today's.",
    refs: ["https://developer.wordpress.org/advanced-administration/upgrade/migrating/"]
  },
  {
    id: "q-0295",
    s: "Change Management", d: 2, level: "Author", stage: 3,
    q: "How do you mark the exact commit you released as version 1.2.0?",
    o: [
      "git commit -m \"1.2.0\"",
      "git stash save 1.2.0",
      "git tag v1.2.0 (and push the tag)",
      "git branch 1.2.0"
    ],
    a: 2,
    t: "Tags name a specific commit permanently, which makes releases easy to find and roll back to.",
    p: "Put a permanent label on the release point.",
    refs: ["https://git-scm.com/docs/git-tag"]
  },
  {
    id: "q-0296",
    s: "Change Management", d: 2, level: "Author", stage: 3,
    q: "What's the main purpose of opening a pull request before merging into main?",
    o: [
      "To have changes reviewed and checked (tests, linting) before they reach the shared branch",
      "To delete the branch",
      "To back up the repository",
      "To deploy instantly"
    ],
    a: 0,
    t: "Pull requests let teammates review the diff and let CI run checks before merging.",
    p: "Someone else looks at your work before it goes in.",
    refs: [
      "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests"
    ]
  },
  {
    id: "q-0297",
    s: "Change Management", d: 2, level: "Author", stage: 3,
    q: "What should CI run on every pull request for a WordPress plugin?",
    o: [
      "Only a spell check",
      "Nothing until release day",
      "Coding standards (PHPCS) and automated tests",
      "A full production deploy"
    ],
    a: 2,
    t: "Running linting and tests on each pull request catches problems before merge.",
    p: "Robots check every change automatically.",
    refs: ["https://docs.github.com/en/actions", "https://github.com/WordPress/WordPress-Coding-Standards"]
  },
  {
    id: "q-0298",
    s: "Scalability", d: 2, level: "Author", stage: 3,
    q: "How does a CDN help a WordPress site under load?",
    o: [
      "It stores user sessions",
      "It speeds up database queries",
      "It serves static files (and cached pages) from servers near users, so fewer requests reach the origin",
      "It replaces PHP"
    ],
    a: 2,
    t: "Offloading static assets and cacheable pages reduces origin traffic and latency.",
    p: "Copies sit closer to visitors, so the main server does less.",
    refs: ["https://developer.wordpress.org/advanced-administration/performance/cache/"]
  },
  {
    id: "q-0299",
    s: "Scalability", d: 2, level: "Author", stage: 3,
    q: "Why do full-page caches usually skip logged-in users?",
    o: [
      "Logged-in users never visit twice",
      "Caches can't store cookies",
      "Their pages are personalised (admin bar, names, carts), so a shared copy could show the wrong content",
      "It's a WordPress rule"
    ],
    a: 2,
    t: "Cookies signal personalised responses, so caches typically bypass them, which is why logged-in traffic costs more server time.",
    p: "Personal pages can't be handed out as one shared copy.",
    refs: ["https://developer.wordpress.org/advanced-administration/performance/cache/"]
  },
  {
    id: "q-0300",
    s: "Disaster Recovery", d: 2, level: "Author", stage: 3,
    q: "What's a recovery point objective (RPO)?",
    o: [
      "The cost of a backup",
      "The point in time you must be able to recover data to, which sets how much data loss is acceptable",
      "The number of backup copies",
      "How long the site may be down"
    ],
    a: 1,
    t: "NIST defines RPO as the point in time to which data must be recovered after an outage. RTO is how quickly service must return.",
    p: "How much recent work you can afford to lose.",
    refs: ["https://csrc.nist.gov/glossary/term/recovery_point_objective"]
  },
  {
    id: "q-0301",
    s: "Disaster Recovery", d: 2, level: "Author", stage: 3,
    q: "Why should you test-restore backups regularly?",
    o: [
      "It speeds up the site",
      "Hosts require it",
      "A backup you've never restored may be incomplete or unusable",
      "It deletes old backups"
    ],
    a: 2,
    t: "WordPress's upgrade guide tells you to verify backups are there and usable. Only a restore proves it.",
    p: "A spare tyre is only useful if you know it holds air.",
    refs: ["https://developer.wordpress.org/advanced-administration/upgrade/upgrading/"]
  },
  {
    id: "q-0302",
    s: "Disaster Recovery", d: 2, level: "Author", stage: 3,
    q: "What does the 3-2-1 backup rule recommend?",
    o: [
      "Three daily backups kept for one week",
      "Back up every three hours",
      "Three copies of data, on two different media or devices, one stored off-site",
      "One backup on the same server"
    ],
    a: 2,
    t: "Several copies in different places protect against device failure, ransomware and site-wide disasters.",
    p: "Don't keep all your copies in one basket.",
    refs: ["https://www.backblaze.com/blog/the-3-2-1-backup-strategy/"]
  },
  {
    id: "q-0303",
    s: "Security", d: 3, level: "Editor", stage: 1,
    q: "A plugin shows a post meta value in a custom admin list column with echo $value. An Author saves <script> in that field. What's the fix?",
    o: [
      "Hide the column from Authors",
      "Sanitize it once on input and keep the raw echo",
      "Add a nonce to the list screen",
      "Escape on output, for example esc_html( $value ), even though only admins view the column"
    ],
    a: 3,
    t: "This is stored XSS that runs in an admin's browser. Escape late, at output, whoever is expected to see it.",
    p: "Whatever the source, make it display as text, never as code.",
    refs: ["https://developer.wordpress.org/apis/security/escaping/"]
  },
  {
    id: "q-0304",
    s: "Security", d: 3, level: "Editor", stage: 1,
    q: "A \"Delete\" link in wp-admin performs the delete on a plain GET request. What makes it CSRF-safe?",
    o: [
      "Use HTTPS",
      "Make the link open in a new tab",
      "Add a nonce with wp_nonce_url() and check it with check_admin_referer() plus a capability check",
      "Use a POST form with no nonce"
    ],
    a: 2,
    t: "Without a nonce, another site could trigger the link in a logged-in admin's browser. Nonce plus capability checks intent and permission.",
    p: "Make sure the click really came from your own page, from someone allowed.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_nonce_url/",
      "https://developer.wordpress.org/reference/functions/check_admin_referer/"
    ]
  },
  {
    id: "q-0305",
    s: "Security", d: 3, level: "Editor", stage: 1,
    q: "A REST route edits a given post ID. What should permission_callback check?",
    o: [
      "current_user_can( 'edit_posts' ) only",
      "current_user_can( 'edit_post', $request['id'] ) for that specific post",
      "__return_true",
      "is_user_logged_in()"
    ],
    a: 1,
    t: "edit_post is a meta capability mapped per object, so authorship and status are respected. edit_posts alone would let an Author edit others' posts.",
    p: "Check permission for this exact post, not posts in general.",
    refs: [
      "https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/",
      "https://developer.wordpress.org/reference/functions/current_user_can/"
    ]
  },
  {
    id: "q-0306",
    s: "Security", d: 3, level: "Editor", stage: 1,
    q: "Which filter lets a plugin grant or remove capabilities dynamically, for example only during a time window?",
    o: ["editable_roles", "map_meta_cap only", "role_has_cap", "user_has_cap"],
    a: 3,
    t: "user_has_cap filters the user's full capability array at check time without changing stored roles.",
    p: "It adjusts permissions on the fly without rewriting the roles.",
    refs: ["https://developer.wordpress.org/reference/hooks/user_has_cap/"]
  },
  {
    id: "q-0307",
    s: "Security", d: 3, level: "Editor", stage: 1,
    q: "Which filter changes how a meta capability (such as edit_post) is translated into primitive capabilities?",
    o: ["user_has_cap", "register_post_type_args", "current_user_can", "map_meta_cap (the filter)"],
    a: 3,
    t: "The map_meta_cap filter receives the required primitive caps for a meta cap, the user and the object, and can change them.",
    p: "It rewrites the rules for what \"may edit this post\" really requires.",
    refs: ["https://developer.wordpress.org/reference/hooks/map_meta_cap/"]
  },
  {
    id: "q-0308",
    s: "Security", d: 3, level: "Editor", stage: 1,
    q: "Why is calling unserialize() on data from a cookie or request dangerous?",
    o: [
      "It breaks UTF-8",
      "It can instantiate objects and trigger magic methods (PHP object injection)",
      "It's slow",
      "It's deprecated"
    ],
    a: 1,
    t: "PHP's manual warns not to pass untrusted input to unserialize(). Use JSON for untrusted data.",
    p: "Unpacking a stranger's parcel can set off whatever is inside.",
    refs: ["https://www.php.net/manual/en/function.unserialize.php"]
  },
  {
    id: "q-0309",
    s: "Security", d: 3, level: "Editor", stage: 1,
    q: "Your plugin must redirect to a partner domain with wp_safe_redirect(). How do you allow it?",
    o: [
      "Add it to siteurl",
      "Disable the check in wp-config.php",
      "Switch to wp_redirect() for every redirect",
      "Add the host with the allowed_redirect_hosts filter"
    ],
    a: 3,
    t: "allowed_redirect_hosts extends the safe list without opening redirects to any host.",
    p: "Add one trusted address to the guest list.",
    refs: [
      "https://developer.wordpress.org/reference/hooks/allowed_redirect_hosts/",
      "https://developer.wordpress.org/reference/functions/wp_safe_redirect/"
    ]
  },
  {
    id: "q-0310",
    s: "Security", d: 3, level: "Editor", stage: 1,
    q: "Which hook lets you add security headers such as Content-Security-Policy to WordPress responses?",
    o: ["admin_head", "init only", "wp_headers (filter) or send_headers (action)", "wp_head"],
    a: 2,
    t: "wp_headers filters the headers array and send_headers fires before they're sent. A CSP limits where scripts may load from.",
    p: "Add rules to every response telling the browser what's allowed.",
    refs: [
      "https://developer.wordpress.org/reference/hooks/wp_headers/",
      "https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP"
    ]
  },
  {
    id: "q-0311",
    s: "Security", d: 3, level: "Editor", stage: 1,
    q: "An integration's Application Password leaks. What's the right response?",
    o: [
      "Delete the user",
      "Disable the REST API",
      "Change the site URL",
      "Revoke that application password only; the user's main password and other apps keep working"
    ],
    a: 3,
    t: "Application Passwords are individually revocable and carry the user's capabilities, so revoke the leaked one and create a new one.",
    p: "Cancel the lost key without changing every lock.",
    refs: ["https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/"]
  },
  {
    id: "q-0312",
    s: "Security", d: 3, level: "Editor", stage: 1,
    q: "Why compare secret tokens with hash_equals() rather than ===?",
    o: [
      "It handles arrays",
      "It takes the same time whatever the input, preventing timing attacks",
      "It ignores case",
      "It's faster"
    ],
    a: 1,
    t: "A normal comparison can stop at the first different character, leaking information through timing. hash_equals() is timing-safe.",
    p: "It never gives away how close a guess was.",
    refs: ["https://www.php.net/manual/en/function.hash-equals.php"]
  },
  {
    id: "q-0313",
    s: "Security", d: 3, level: "Editor", stage: 1,
    q: "Which is suitable for generating a random API secret in a plugin?",
    o: ["wp_generate_password( 32, true, true ) or random_bytes()", "rand()", "md5( time() )", "uniqid()"],
    a: 0,
    t: "wp_generate_password() uses a cryptographically secure source. Time-based or rand() values are predictable.",
    p: "Use real randomness, not something guessable like the clock.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_generate_password/",
      "https://www.php.net/manual/en/function.random-bytes.php"
    ]
  },
  {
    id: "q-0314",
    s: "Security", d: 3, level: "Editor", stage: 1,
    q: "A custom profile form saves a \"role\" field from $_POST. What must happen first?",
    o: [
      "Sanitize it with sanitize_key() only",
      "Verify a nonce only",
      "Nothing; roles are validated by WordPress",
      "Check current_user_can( 'promote_users' ) (and the target user), never trust the submitted role"
    ],
    a: 3,
    t: "Without a capability check, any user could promote themselves to Administrator. Nonces confirm intent, not permission.",
    p: "Check they're allowed to hand out promotions before accepting one.",
    refs: [
      "https://developer.wordpress.org/reference/functions/current_user_can/",
      "https://wordpress.org/documentation/article/roles-and-capabilities/"
    ]
  },
  {
    id: "q-0315",
    s: "WordPress Core", d: 3, level: "Editor", stage: 1,
    q: "On multisite, where should a network-wide setting live?",
    o: [
      "User meta of the Super Admin",
      "A transient",
      "A network option with get_site_option() / update_site_option()",
      "A regular option on site 1"
    ],
    a: 2,
    t: "Network options are stored in wp_sitemeta and shared by every site.",
    p: "Save it on the network's noticeboard, not one site's.",
    refs: [
      "https://developer.wordpress.org/reference/functions/get_site_option/",
      "https://developer.wordpress.org/reference/functions/update_site_option/"
    ]
  },
  {
    id: "q-0316",
    s: "WordPress Core", d: 3, level: "Editor", stage: 1,
    q: "How do you check whether a plugin is network-activated on multisite?",
    o: [
      "is_plugin_active_for_network()",
      "is_multisite()",
      "is_plugin_active() alone",
      "get_option( 'active_plugins' )"
    ],
    a: 0,
    t: "Network-activated plugins are stored separately (active_sitewide_plugins), and is_plugin_active_for_network() checks them.",
    p: "Ask whether it's switched on for the whole network.",
    refs: ["https://developer.wordpress.org/reference/functions/is_plugin_active_for_network/"]
  },
  {
    id: "q-0317",
    s: "Scalability", d: 3, level: "Editor", stage: 1,
    q: "A network has 5,000 sites. A task loops get_sites() and calls switch_to_blog() for each on a page load. What's the problem?",
    o: [
      "Each switch changes context and can flush caches, so thousands of switches in one request is slow; batch it in WP-CLI or a background job",
      "Nothing",
      "switch_to_blog() loads every plugin",
      "get_sites() is limited to 10"
    ],
    a: 0,
    t: "get_sites() defaults to 100 results, and switching is costly. Large network jobs belong in batched CLI or queued work.",
    p: "Visiting 5,000 rooms on one errand takes forever. Split the job.",
    refs: [
      "https://developer.wordpress.org/reference/functions/get_sites/",
      "https://developer.wordpress.org/reference/functions/switch_to_blog/"
    ]
  },
  {
    id: "q-0318",
    s: "Custom Development", d: 3, level: "Editor", stage: 1,
    q: "You want /events/2026/ to load an events archive filtered by year. What do you need?",
    o: [
      "add_rewrite_rule() mapping to a query, a registered query var, and a rewrite flush",
      "A page called events",
      "A redirect in .htaccess",
      "A shortcode"
    ],
    a: 0,
    t: "add_rewrite_rule() maps the pattern to query vars, and those vars must be registered so WordPress keeps them.",
    p: "Teach WordPress what the new address means.",
    refs: [
      "https://developer.wordpress.org/reference/functions/add_rewrite_rule/",
      "https://developer.wordpress.org/reference/hooks/query_vars/"
    ]
  },
  {
    id: "q-0319",
    s: "Custom Development", d: 3, level: "Editor", stage: 1,
    q: "get_query_var( 'event_year' ) is always empty even though your rewrite rule sets it. What's missing?",
    o: [
      "Flushing the object cache",
      "Registering event_year with the query_vars filter (or add_rewrite_tag())",
      "Calling wp_reset_query()",
      "A higher hook priority"
    ],
    a: 1,
    t: "WordPress discards unknown query vars. The query_vars filter or add_rewrite_tag() makes them public.",
    p: "WordPress ignores names it hasn't been told about.",
    refs: [
      "https://developer.wordpress.org/reference/hooks/query_vars/",
      "https://developer.wordpress.org/reference/functions/add_rewrite_tag/"
    ]
  },
  {
    id: "q-0320",
    s: "Custom Development", d: 3, level: "Editor", stage: 1,
    q: "Which function adds a computed field to an existing core REST response, such as posts?",
    o: ["register_meta() only", "register_rest_route()", "rest_prepare_post() only", "register_rest_field()"],
    a: 3,
    t: "register_rest_field( $object_type, $name, array( get_callback, update_callback, schema ) ) adds a field to existing endpoints.",
    p: "It adds one more piece of information to an existing answer.",
    refs: ["https://developer.wordpress.org/reference/functions/register_rest_field/"]
  },
  {
    id: "q-0321",
    s: "Performance", d: 3, level: "Editor", stage: 1,
    q: "A headless front end only needs id, title and link from /wp/v2/posts. How do you shrink the response?",
    o: [
      "Add the _fields parameter, such as ?_fields=id,title,link",
      "Use ?context=edit",
      "Increase per_page",
      "Use ?_embed"
    ],
    a: 0,
    t: "_fields limits the response to the listed fields, which can also skip work preparing others.",
    p: "Ask only for the columns you need.",
    refs: ["https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/"]
  },
  {
    id: "q-0322",
    s: "Performance", d: 3, level: "Editor", stage: 1,
    q: "What does ?_embed do on a REST request?",
    o: [
      "Removes all links",
      "Caches the response",
      "Returns HTML",
      "Includes linked resources (author, featured media, terms) in the same response"
    ],
    a: 3,
    t: "_embed saves round trips by embedding linked objects, at the cost of a larger, slower response.",
    p: "It brings the related bits along in one trip.",
    refs: ["https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/"]
  },
  {
    id: "q-0323",
    s: "WordPress Core", d: 3, level: "Editor", stage: 1,
    q: "Which API powers autosave locks and \"someone else is editing\" notices, and can be hooked from PHP with heartbeat_received?",
    o: ["The REST API batch endpoint", "The Heartbeat API", "admin-ajax only", "WP-Cron"],
    a: 1,
    t: "Heartbeat sends periodic AJAX ticks. Plugins can attach data with heartbeat_received and the JavaScript events.",
    p: "It's the editor's regular \"still here\" ping.",
    refs: ["https://developer.wordpress.org/plugins/javascript/heartbeat-api/"]
  },
  {
    id: "q-0324",
    s: "WordPress Core", d: 3, level: "Editor", stage: 1,
    q: "You must change post data (for example force a field) before it's written to the database. Which hook fits?",
    o: ["wp_insert_post_data (filter)", "publish_post only", "the_post", "save_post (action)"],
    a: 0,
    t: "wp_insert_post_data filters the sanitized data before insert or update. save_post fires afterwards, so changing data there means another update.",
    p: "Change it on the way in, not after it's been saved.",
    refs: ["https://developer.wordpress.org/reference/hooks/wp_insert_post_data/"]
  },
  {
    id: "q-0325",
    s: "WordPress Core", d: 3, level: "Editor", stage: 1,
    q: "Your save_post handler runs twice and sends duplicate emails. What should it check?",
    o: [
      "Use a higher priority",
      "Add a nonce to the email",
      "Skip autosaves and revisions with wp_is_post_autosave() and wp_is_post_revision()",
      "Hook init instead"
    ],
    a: 2,
    t: "save_post also fires for autosaves and revisions. Check those (and your own nonce and capabilities) before acting.",
    p: "Ignore the background drafts and only act on the real save.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_is_post_revision/",
      "https://developer.wordpress.org/reference/functions/wp_is_post_autosave/",
      "https://developer.wordpress.org/reference/hooks/save_post/"
    ]
  },
  {
    id: "q-0326",
    s: "Custom Development", d: 3, level: "Editor", stage: 1,
    q: "Which statements about the save_post hook are true?",
    o: [
      "It fires after the post has been saved to the database",
      "Calling wp_update_post() inside it without unhooking first can cause an infinite loop",
      "It only fires when a post is first published",
      "It fires for autosaves and revisions too"
    ],
    a: [0, 1, 3],
    t: "save_post runs after save on every save, including autosaves and revisions. Updating the post inside it re-fires the hook unless you remove the callback first.",
    p: "It runs after every kind of save, and saving again inside it starts the loop again.",
    refs: ["https://developer.wordpress.org/reference/hooks/save_post/"]
  },
  {
    id: "q-0327",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "How does WordPress use a persistent object cache such as Redis?",
    o: [
      "Through an object-cache.php drop-in in wp-content that replaces the default cache",
      "Automatically when Redis is installed",
      "Through .htaccess",
      "Through a setting in Settings → General"
    ],
    a: 0,
    t: "The drop-in replaces WP_Object_Cache. wp_using_ext_object_cache() reports whether one is active.",
    p: "A special file plugs WordPress into the external memory store.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_using_ext_object_cache/"]
  },
  {
    id: "q-0328",
    s: "Scalability", d: 3, level: "Editor", stage: 2,
    q: "A popular cached item expires and hundreds of requests rebuild it at once, overloading the database. What's this, and a fix?",
    o: [
      "A memory leak; add RAM",
      "A deadlock; restart MySQL",
      "Normal behaviour; nothing to fix",
      "A cache stampede; serve the stale value while one request rebuilds it, or use a lock"
    ],
    a: 3,
    t: "Stale-while-revalidate (RFC 5861) or a rebuild lock means only one worker regenerates while others get the old copy.",
    p: "Let one person restock the shelf while everyone else takes what's there.",
    refs: ["https://www.rfc-editor.org/rfc/rfc5861"]
  },
  {
    id: "q-0329",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "Why is filtering on meta_value often slow even though meta_key is indexed?",
    o: [
      "meta_value is a LONGTEXT with only a limited prefix index (or none), so comparisons scan many rows",
      "meta_key isn't indexed",
      "Because of autoload",
      "MySQL can't index text at all"
    ],
    a: 0,
    t: "Large text columns can't be fully indexed. Values you filter on often belong in a taxonomy or a custom table.",
    p: "The values are stored in a way the database can't quickly look up.",
    refs: ["https://dev.mysql.com/doc/refman/8.0/en/column-indexes.html"]
  },
  {
    id: "q-0330",
    s: "Scalability", d: 3, level: "Editor", stage: 2,
    q: "You need to update 200,000 posts. Where should that run?",
    o: [
      "In a WP-CLI command that processes batches, or a background queue",
      "In one admin page request",
      "In wp-config.php",
      "In a front-end shortcode"
    ],
    a: 0,
    t: "Web requests time out and tie up PHP workers. CLI commands and queues handle long, batched work.",
    p: "Do the big job in the back room, in chunks.",
    refs: ["https://make.wordpress.org/cli/handbook/guides/commands-cookbook/"]
  },
  {
    id: "q-0331",
    s: "Scalability", d: 3, level: "Editor", stage: 2,
    q: "Which library, used by WooCommerce and others, provides a scalable queue for background jobs in WordPress?",
    o: ["Transients API", "Action Scheduler", "Heartbeat API", "WP-Cron alone"],
    a: 1,
    t: "Action Scheduler stores jobs in custom tables and processes them in batches, handling large volumes better than plain WP-Cron.",
    p: "It's a to-do list that works through jobs in the background.",
    refs: ["https://actionscheduler.org/"]
  },
  {
    id: "q-0332",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "During a large import, which function stops new items being added to the object cache to save memory?",
    o: [
      "wp_cache_flush()",
      "wp_suspend_cache_invalidation( false )",
      "wp_suspend_cache_addition( true )",
      "wp_cache_close()"
    ],
    a: 2,
    t: "wp_suspend_cache_addition() prevents wp_cache_add() from storing data, which keeps memory down in long-running imports.",
    p: "Stop filling the memory with things you won't reuse.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_suspend_cache_addition/"]
  },
  {
    id: "q-0333",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "During a bulk import, term counts are recalculated after every post. What speeds that up?",
    o: [
      "Use a higher memory limit",
      "wp_defer_term_counting( true ), then false at the end",
      "Disable taxonomies",
      "Delete term counts"
    ],
    a: 1,
    t: "Deferring term counting batches the recalculation until you turn it back on.",
    p: "Count everything once at the end instead of after every item.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_defer_term_counting/"]
  },
  {
    id: "q-0334",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "You cache several query results in a group. What's an efficient way to invalidate them all when posts change?",
    o: [
      "Loop through every key and delete it",
      "Never cache queries",
      "Include a \"last changed\" value in the keys (wp_cache_get_last_changed()) and bump it on change",
      "Flush the whole cache"
    ],
    a: 2,
    t: "Versioned keys make old entries unreachable at once without deleting each one. Core uses this pattern for queries.",
    p: "Change the label on the drawer, and the old contents are simply ignored.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_cache_get_last_changed/"]
  },
  {
    id: "q-0335",
    s: "Scalability", d: 3, level: "Editor", stage: 2,
    q: "An endpoint returns user-specific data. Which function sends headers that stop browsers and proxies from caching it?",
    o: [
      "nocache_headers()",
      "send_frame_options_header()",
      "wp_cache_set()",
      "header( 'Cache-Control: public' )"
    ],
    a: 0,
    t: "nocache_headers() sends no-cache headers so personal responses aren't stored and shown to others.",
    p: "Tell every cache along the way not to keep a copy.",
    refs: ["https://developer.wordpress.org/reference/functions/nocache_headers/"]
  },
  {
    id: "q-0336",
    s: "Scalability", d: 3, level: "Editor", stage: 2,
    q: "Why should you avoid Vary: Cookie (or varying on many headers) on pages behind a CDN?",
    o: [
      "It's not allowed by HTTP",
      "It disables HTTPS",
      "Browsers ignore Vary",
      "Each distinct value creates a separate cache entry, which can destroy the hit rate"
    ],
    a: 3,
    t: "Vary tells caches to store a copy per header value. Cookies differ per user, so almost nothing is shared.",
    p: "If every visitor needs their own copy, the cache stops helping.",
    refs: ["https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary"]
  },
  {
    id: "q-0337",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "Which core function builds the srcset that lets browsers download an appropriately sized image?",
    o: ["add_image_size()", "wp_calculate_image_srcset()", "wp_get_attachment_url()", "image_downsize() only"],
    a: 1,
    t: "Core adds srcset and sizes to images from the registered sizes, so smaller screens download smaller files.",
    p: "It offers the browser several sizes so it can pick the right one.",
    refs: ["https://developer.wordpress.org/reference/functions/wp_calculate_image_srcset/"]
  },
  {
    id: "q-0338",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "What does fetchpriority=\"high\" on the main hero image do?",
    o: [
      "Preloads every image",
      "Disables lazy loading everywhere",
      "Hints the browser to download it before other images, improving Largest Contentful Paint",
      "Compresses the image"
    ],
    a: 2,
    t: "Priority hints help the most important image arrive sooner. Don't also lazy-load that image.",
    p: "It tells the browser \"this picture first\".",
    refs: ["https://web.dev/articles/fetch-priority"]
  },
  {
    id: "q-0339",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "What's the difference between async and defer scripts?",
    o: [
      "They're identical",
      "async runs before HTML parsing",
      "defer blocks rendering",
      "Both download in parallel; defer runs in order after parsing, async runs as soon as it arrives, in any order"
    ],
    a: 3,
    t: "defer preserves order and waits for parsing. async suits independent scripts such as analytics.",
    p: "Defer waits its turn; async goes whenever it's ready.",
    refs: [
      "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script",
      "https://developer.wordpress.org/reference/functions/wp_enqueue_script/"
    ]
  },
  {
    id: "q-0340",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "Which function, added in WordPress 6.4, changes the autoload flag of several options without rewriting their values?",
    o: [
      "delete_option()",
      "wp_set_option_autoload_values()",
      "wp_load_alloptions()",
      "update_option() with autoload only"
    ],
    a: 1,
    t: "wp_set_option_autoload_values() updates autoload flags in bulk, for example to stop large options loading on every request.",
    p: "Switch off \"load every time\" for heavy settings in one go.",
    refs: ["https://make.wordpress.org/core/2023/10/17/new-option-functions-in-6-4/"]
  },
  {
    id: "q-0341",
    s: "Scalability", d: 3, level: "Editor", stage: 2,
    q: "With a primary database and read replicas (for example via LudicrousDB), where must writes go?",
    o: [
      "To the object cache",
      "To any replica",
      "To the primary; reads can be spread across replicas",
      "To all replicas directly"
    ],
    a: 2,
    t: "Replicas copy from the primary. Writing to a replica would diverge the data.",
    p: "Only the main copy takes changes; the copies just read.",
    refs: ["https://github.com/stuttter/ludicrousdb"]
  },
  {
    id: "q-0342",
    s: "Scalability", d: 3, level: "Editor", stage: 2,
    q: "After saving a post, a user immediately reloads and sees old data. Replicas are in use. What's the likely cause?",
    o: [
      "A PHP error",
      "A missing index",
      "Replication lag: the read hit a replica that hadn't caught up; send reads after writes to the primary",
      "Browser cache"
    ],
    a: 2,
    t: "Replicas trail the primary slightly. Database drop-ins usually route reads to the primary after a write in the same request.",
    p: "The copy hadn't received the update yet.",
    refs: ["https://github.com/stuttter/ludicrousdb"]
  },
  {
    id: "q-0343",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "Why does core WordPress search get slow on large sites?",
    o: [
      "It uses full-text indexes",
      "It calls an external API",
      "It searches the uploads folder",
      "It runs LIKE '%term%' queries across post titles and content, which can't use indexes"
    ],
    a: 3,
    t: "Leading-wildcard LIKE queries scan tables. Large sites often move search to Elasticsearch or OpenSearch.",
    p: "It reads every page looking for the word instead of using an index.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_query/"]
  },
  {
    id: "q-0344",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "Which object cache functions fetch or store many keys in one round trip?",
    o: [
      "wp_cache_get() in a loop",
      "wp_cache_flush_group()",
      "wp_cache_get_multiple() and wp_cache_set_multiple()",
      "get_transient() arrays"
    ],
    a: 2,
    t: "wp_cache_get_multiple() (WordPress 5.5) and wp_cache_set_multiple() (6.0) reduce network round trips to Redis or Memcached when the backend supports batching.",
    p: "Ask for many things in one trip.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_cache_get_multiple/",
      "https://developer.wordpress.org/reference/functions/wp_cache_set_multiple/"
    ]
  },
  {
    id: "q-0345",
    s: "Debugging", d: 3, level: "Editor", stage: 2,
    q: "Which Query Monitor panel points you to N+1 query problems?",
    o: ["Environment", "Request", "Languages", "Duplicate Queries"],
    a: 3,
    t: "Duplicate Queries groups identical queries and shows the callers, which reveals loops querying per item.",
    p: "It spots the same question being asked over and over.",
    refs: ["https://wordpress.org/plugins/query-monitor/"]
  },
  {
    id: "q-0346",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "What does PHP's OPcache do?",
    o: [
      "Caches full pages",
      "Caches database results",
      "Stores compiled PHP bytecode in memory so scripts aren't recompiled on every request",
      "Minifies JavaScript"
    ],
    a: 2,
    t: "OPcache removes repeated parsing and compiling, a large win for PHP-heavy apps like WordPress.",
    p: "It remembers the translated code so PHP doesn't redo the work.",
    refs: ["https://www.php.net/manual/en/intro.opcache.php"]
  },
  {
    id: "q-0347",
    s: "Scalability", d: 3, level: "Editor", stage: 2,
    q: "Under load the site returns 502/504 errors and every PHP-FPM worker is busy waiting on a slow external API. What's the core fix?",
    o: [
      "Disable OPcache",
      "Stop blocking page loads on the API: short timeouts, caching, or moving the call to the background",
      "Add more plugins",
      "Raise max_execution_time"
    ],
    a: 1,
    t: "Each blocked request holds a worker. Once all are busy, new requests fail. Removing slow synchronous calls frees them.",
    p: "Don't let every cashier stand waiting on a phone call.",
    refs: [
      "https://www.php.net/manual/en/install.fpm.php",
      "https://developer.wordpress.org/reference/functions/wp_remote_get/"
    ]
  },
  {
    id: "q-0348",
    s: "Scalability", d: 3, level: "Editor", stage: 2,
    q: "A cron task sometimes takes longer than its interval, and runs overlap and corrupt data. What helps?",
    o: [
      "Running it on every page load",
      "A shorter interval",
      "Removing the task",
      "A lock (for example an option or cache key with an expiry) so a second run exits if one is in progress"
    ],
    a: 3,
    t: "WP-Cron doesn't prevent overlap. A lock keeps one run at a time, and the expiry clears stale locks.",
    p: "Put a \"busy\" sign on the door so a second worker doesn't barge in.",
    refs: ["https://developer.wordpress.org/plugins/cron/"]
  },
  {
    id: "q-0349",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "The Heartbeat API is causing heavy admin-ajax.php traffic. How do you reduce it?",
    o: [
      "Lengthen its interval with the heartbeat_settings filter (or disable it on screens that don't need it)",
      "Disable autosave",
      "Delete admin-ajax.php",
      "Block all AJAX"
    ],
    a: 0,
    t: "Heartbeat's tick interval can be changed. Removing it from the editor would lose post locking and autosave notices.",
    p: "Make the check-in ping less often.",
    refs: [
      "https://developer.wordpress.org/plugins/javascript/heartbeat-api/",
      "https://developer.wordpress.org/reference/hooks/heartbeat_settings/"
    ]
  },
  {
    id: "q-0350",
    s: "Debugging", d: 3, level: "Editor", stage: 3,
    q: "Production returns a 500 error, debug.log is empty, and WP_DEBUG_LOG is on. Where do you look next?",
    o: [
      "The browser console only",
      "The web server and PHP-FPM error logs (the error may happen before WordPress loads)",
      "wp_options",
      "The Media Library"
    ],
    a: 1,
    t: "Errors in wp-config.php, PHP startup or server config never reach WordPress's log. Server logs capture them.",
    p: "If the house never opened, check the building's own logbook.",
    refs: [
      "https://www.php.net/manual/en/errorfunc.configuration.php",
      "https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/"
    ]
  },
  {
    id: "q-0351",
    s: "Debugging", d: 3, level: "Editor", stage: 3,
    q: "A fatal error in a must-use plugin takes the site down. Why doesn't recovery mode let you pause it?",
    o: [
      "Recovery mode starts after mu-plugins load, and mu-plugins can't be deactivated from wp-admin",
      "mu-plugins never cause fatals",
      "Recovery mode only works for themes",
      "Recovery mode is off by default"
    ],
    a: 0,
    t: "Core initializes recovery mode after mu-plugins, so fixing one means editing or removing the file directly.",
    p: "The emergency switch only covers plugins it can turn off.",
    refs: [
      "https://core.trac.wordpress.org/ticket/52560",
      "https://make.wordpress.org/core/2019/04/16/fatal-error-recovery-mode-in-5-2/"
    ]
  },
  {
    id: "q-0352",
    s: "Debugging", d: 3, level: "Editor", stage: 3,
    q: "Which drop-in replaces WordPress's fatal error handler with your own?",
    o: [
      "wp-content/error.php",
      "wp-content/db-error.php",
      "wp-content/fatal-error-handler.php",
      "wp-content/advanced-cache.php"
    ],
    a: 2,
    t: "The drop-in must return an instance of a class extending WP_Fatal_Error_Handler.",
    p: "A special file lets you write your own crash page logic.",
    refs: ["https://make.wordpress.org/core/2019/04/16/fatal-error-recovery-mode-in-5-2/"]
  },
  {
    id: "q-0353",
    s: "Debugging", d: 3, level: "Editor", stage: 3,
    q: "Which constant turns off the fatal error handler and recovery mode entirely?",
    o: ["WP_DEBUG", "WP_DISABLE_FATAL_ERROR_HANDLER", "WP_SANDBOX_SCRAPING", "DISABLE_RECOVERY"],
    a: 1,
    t: "Defining WP_DISABLE_FATAL_ERROR_HANDLER as true disables the handler, which some environments prefer.",
    p: "It switches off the built-in crash catcher.",
    refs: ["https://make.wordpress.org/core/2019/04/16/fatal-error-recovery-mode-in-5-2/"]
  },
  {
    id: "q-0354",
    s: "Debugging", d: 3, level: "Editor", stage: 3,
    q: "A bug appeared somewhere in the last 80 commits. Which Git tool finds the commit fastest?",
    o: ["git log -p", "git blame on every file", "git stash", "git bisect"],
    a: 3,
    t: "git bisect binary-searches the history: mark good and bad, and it narrows to the first bad commit in about log2(n) steps.",
    p: "Halve the search each time until you land on the culprit.",
    refs: ["https://git-scm.com/docs/git-bisect"]
  },
  {
    id: "q-0355",
    s: "Change Management", d: 3, level: "Editor", stage: 3,
    q: "What's blue-green deployment?",
    o: [
      "Running two identical production environments and switching traffic from the old (blue) to the new (green) one, so rollback is a switch back",
      "Deploying only on weekdays",
      "Running tests in two browsers",
      "Colour-coding branches"
    ],
    a: 0,
    t: "Switching traffic between environments allows near-instant release and rollback.",
    p: "Keep the old stage set up so you can switch back in seconds.",
    refs: ["https://martinfowler.com/bliki/BlueGreenDeployment.html"]
  },
  {
    id: "q-0356",
    s: "Change Management", d: 3, level: "Editor", stage: 3,
    q: "How should a plugin handle custom table schema changes across versions?",
    o: [
      "Ask users to run SQL",
      "Only on activation, since updates trigger activation",
      "Store a db_version option, compare it on load, and run an idempotent upgrade (for example dbDelta) when it's lower",
      "Recreate the table on every request"
    ],
    a: 2,
    t: "Plugin updates don't fire the activation hook, so compare a stored version and upgrade when needed.",
    p: "Keep a note of the version and upgrade the table when it's behind.",
    refs: ["https://developer.wordpress.org/plugins/creating-tables-with-plugins/"]
  },
  {
    id: "q-0357",
    s: "Change Management", d: 3, level: "Editor", stage: 3,
    q: "What makes WordPress show \"Briefly unavailable for scheduled maintenance\" during updates?",
    o: [
      "A setting in wp_options",
      "The hosting panel",
      "A plugin",
      "A .maintenance file in the site root, removed when the update finishes"
    ],
    a: 3,
    t: "Core creates .maintenance during updates. If an update dies, the file can be left behind and must be deleted.",
    p: "A temporary sign file goes up during updates and should come down afterwards.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_maintenance/",
      "https://developer.wordpress.org/reference/functions/wp_is_maintenance_mode/"
    ]
  },
  {
    id: "q-0358",
    s: "Change Management", d: 3, level: "Editor", stage: 3,
    q: "In a Composer-managed project, where do you usually get WordPress.org plugins and themes as packages?",
    o: ["WordPress Packagist (wpackagist.org)", "PECL", "npm", "The Plugins screen only"],
    a: 0,
    t: "WPackagist mirrors the WordPress.org directories as Composer packages, so plugins can be version-pinned in composer.json.",
    p: "It turns the plugin directory into something Composer can install.",
    refs: ["https://wpackagist.org/"]
  },
  {
    id: "q-0359",
    s: "Security", d: 3, level: "Editor", stage: 3,
    q: "How should production secrets reach wp-config.php in a Git-based workflow?",
    o: [
      "From environment variables or a secrets store, read with getenv(), never committed",
      "In a public .env file in the web root",
      "In the database",
      "Hard-coded and committed"
    ],
    a: 0,
    t: "Keeping secrets out of the repository prevents leaks and lets each environment have its own values.",
    p: "Keep the keys out of the code box.",
    refs: ["https://docs.github.com/en/get-started/learning-to-code/storing-your-secrets-safely"]
  },
  {
    id: "q-0360",
    s: "Change Management", d: 3, level: "Editor", stage: 3,
    q: "What's the main benefit of feature toggles?",
    o: [
      "Separating deployment from release: code ships turned off and is switched on (or off) without redeploying",
      "Faster PHP",
      "No need for tests",
      "Smaller databases"
    ],
    a: 0,
    t: "Toggles let incomplete or risky features ship dark and be turned on gradually or rolled back instantly.",
    p: "Install the light, but keep the switch off until you're ready.",
    refs: ["https://martinfowler.com/articles/feature-toggles.html"]
  },
  {
    id: "q-0361",
    s: "Change Management", d: 3, level: "Editor", stage: 3,
    q: "What should a good changelog entry focus on?",
    o: [
      "Internal ticket numbers only",
      "Notable changes for users, grouped (Added, Changed, Fixed, Removed), with the version and date",
      "Nothing; Git history is enough",
      "Every commit message"
    ],
    a: 1,
    t: "Keep a Changelog recommends human-readable, grouped entries per release.",
    p: "Tell people what changed for them, not every keystroke.",
    refs: ["https://keepachangelog.com/"]
  },
  {
    id: "q-0362",
    s: "Security", d: 3, level: "Editor", stage: 3,
    q: "After a compromise, which WP-CLI command quickly lists every administrator?",
    o: ["wp user get admin", "wp user list --role=administrator", "wp admin list", "wp role list"],
    a: 1,
    t: "Attackers often add hidden admins. Listing them, with registration dates, is an early check.",
    p: "Check who holds the master keys.",
    refs: ["https://developer.wordpress.org/cli/commands/user/list/"]
  },
  {
    id: "q-0363",
    s: "Security", d: 3, level: "Editor", stage: 3,
    q: "What's a limitation of wp plugin verify-checksums?",
    o: [
      "It needs a paid licence",
      "It fixes changed files",
      "It can only check plugins hosted on WordPress.org; premium and custom plugins have no checksums to compare",
      "It checks themes too"
    ],
    a: 2,
    t: "Checksums come from WordPress.org. Other plugins need a clean copy from their vendor to compare.",
    p: "It can only compare against originals it has on file.",
    refs: ["https://developer.wordpress.org/cli/commands/plugin/verify-checksums/"]
  },
  {
    id: "q-0364",
    s: "Disaster Recovery", d: 3, level: "Editor", stage: 3,
    q: "A table was dropped at 14:05. You have last night's full backup and MySQL binary logs. What lets you recover to 14:04?",
    o: [
      "Restore last night's backup only",
      "Nothing; the table is gone",
      "Restore the full backup, then replay the binary logs up to just before 14:05 (point-in-time recovery)",
      "Run wp db repair"
    ],
    a: 2,
    t: "Binary logs record changes since the backup, so they can be replayed to a chosen moment.",
    p: "Rewind to last night, then fast-forward to just before the mistake.",
    refs: ["https://dev.mysql.com/doc/refman/8.0/en/point-in-time-recovery.html"]
  },
  {
    id: "q-0365",
    s: "Disaster Recovery", d: 3, level: "Editor", stage: 3,
    q: "What's a recovery time objective (RTO)?",
    o: [
      "The longest a system can be down before the impact is unacceptable",
      "How much data you can lose",
      "How often to back up",
      "The age of the oldest backup"
    ],
    a: 0,
    t: "RTO is about time to restore service. RPO is about how much recent data you can lose.",
    p: "How long you can afford to be closed.",
    refs: ["https://csrc.nist.gov/glossary/term/recovery_time_objective"]
  },
  {
    id: "q-0366",
    s: "Disaster Recovery", d: 3, level: "Editor", stage: 3,
    q: "Why is a backup stored only on the same server as the site a weak backup?",
    o: [
      "It's slower to restore",
      "It takes more space",
      "WordPress can't read it",
      "A server failure, hack or host problem can destroy the site and the backup together"
    ],
    a: 3,
    t: "The hardening guide recommends keeping snapshots in a trusted, separate location.",
    p: "A spare key hidden in the same burning house doesn't help.",
    refs: ["https://developer.wordpress.org/advanced-administration/security/hardening/"]
  },
  {
    id: "q-0367",
    s: "Disaster Recovery", d: 3, level: "Editor", stage: 3,
    q: "You're moving a site to a new server tomorrow. What should you do with DNS today?",
    o: [
      "Nothing",
      "Raise the TTL to a week",
      "Lower the record's TTL so the change spreads quickly when you switch",
      "Delete the record"
    ],
    a: 2,
    t: "Resolvers cache records for the TTL. A low TTL ahead of time shortens the window where visitors reach the old server.",
    p: "Shorten how long people remember the old address before you move.",
    refs: ["https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/"]
  },
  {
    id: "q-0368",
    s: "Change Management", d: 3, level: "Editor", stage: 3,
    q: "What's the purpose of a blameless postmortem after an outage?",
    o: [
      "To close the ticket",
      "To understand causes and fix systems and processes, without punishing people, so the full story comes out",
      "To find who to blame",
      "To satisfy legal requirements only"
    ],
    a: 1,
    t: "Google's SRE guidance describes blameless postmortems as focusing on contributing causes and follow-up actions.",
    p: "Fix the system, not the person, so people tell the whole truth.",
    refs: ["https://sre.google/sre-book/postmortem-culture/"]
  },
  {
    id: "q-0369",
    s: "Debugging", d: 3, level: "Editor", stage: 3,
    q: "Logged-out REST requests work, but every authenticated one from an integration fails. Which filter shows where authentication is being rejected?",
    o: ["determine_current_user only", "rest_authentication_errors", "rest_url", "rest_pre_echo_response"],
    a: 1,
    t: "rest_authentication_errors carries any authentication error for the request. Logging it reveals why requests are rejected.",
    p: "Check what reason the API gives for turning the visitor away.",
    refs: ["https://developer.wordpress.org/reference/hooks/rest_authentication_errors/"]
  },
  {
    id: "q-0370",
    s: "Debugging", d: 3, level: "Editor", stage: 3,
    q: "Your code runs too early. Which function tells you whether an action has already fired, and how many times?",
    o: ["current_filter()", "has_action()", "doing_action() only", "did_action()"],
    a: 3,
    t: "did_action( $hook ) returns how many times it has run. has_action() only checks whether callbacks are attached.",
    p: "It checks whether that moment has already happened.",
    refs: ["https://developer.wordpress.org/reference/functions/did_action/"]
  },
  {
    id: "q-0371",
    s: "Debugging", d: 3, level: "Editor", stage: 3,
    q: "Which action fires after every HTTP API request, so you can log the response for debugging?",
    o: ["pre_http_request", "wp_remote_complete", "http_request_args", "http_api_debug"],
    a: 3,
    t: "http_api_debug receives the response, context, class, args and URL after each request.",
    p: "It lets you note down every outside call and its answer.",
    refs: ["https://developer.wordpress.org/reference/hooks/http_api_debug/"]
  },
  {
    id: "q-0372",
    s: "Debugging", d: 3, level: "Editor", stage: 3,
    q: "Which statements about debugging on production are true?",
    o: [
      "SAVEQUERIES is fine to leave on permanently",
      "Errors should be logged, not displayed",
      "A debug output limited to one admin's session is lower risk than site-wide output",
      "Log files belong outside the public web root"
    ],
    a: [1, 2, 3],
    t: "Display exposes details, public logs leak data, and SAVEQUERIES adds overhead on every request. Narrowly scoped output reduces risk.",
    p: "Keep notes private and switch off heavy tracing when you're done.",
    refs: ["https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/"]
  },
  {
    id: "q-0373",
    s: "Debugging", d: 3, level: "Editor", stage: 3,
    q: "Which Query Monitor panel shows which template file rendered the current page?",
    o: ["HTTP API Calls", "Scripts", "Hooks & Actions", "Template"],
    a: 3,
    t: "The Template panel lists the template file, template parts and the hierarchy candidates WordPress considered.",
    p: "It tells you exactly which layout file was used.",
    refs: ["https://wordpress.org/plugins/query-monitor/"]
  },
  {
    id: "q-0374",
    s: "Performance", d: 3, level: "Editor", stage: 2,
    q: "Which function, added in WordPress 6.1, clears a single object cache group, and how do you know the backend supports it?",
    o: [
      "wp_cache_delete() with a wildcard",
      "wp_cache_flush() with a group name",
      "delete_transient() for the group",
      "wp_cache_flush_group(), after checking wp_cache_supports( 'flush_group' )"
    ],
    a: 3,
    t: "Not every cache backend can flush one group, so check wp_cache_supports() first and fall back to versioned keys.",
    p: "Empty one drawer, but first check the cabinet lets you.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_cache_flush_group/",
      "https://developer.wordpress.org/reference/functions/wp_cache_supports/"
    ]
  },
  {
    id: "q-0375",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "A popular plugin you use changes owner and ships an update with obfuscated code. What's the risk category, and the right response?",
    o: [
      "Supply-chain risk from a third-party component: pin the version, review the diff, and replace or remove it if the change can't be explained",
      "A licensing issue only",
      "None; WordPress.org reviews every update",
      "A false positive; update anyway"
    ],
    a: 0,
    t: "OWASP lists vulnerable and outdated components as a top risk. Ownership changes and unreadable code are warning signs.",
    p: "When a trusted supplier changes hands, check the delivery before letting it in.",
    refs: [
      "https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/",
      "https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/"
    ]
  },
  {
    id: "q-0376",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "Why does the hardening guide warn against revoking ALTER and CREATE from WordPress's database user?",
    o: [
      "They speed up queries",
      "Core and plugin updates sometimes change the schema, and missing privileges can break those updates",
      "WordPress needs them on every request",
      "MySQL requires them"
    ],
    a: 1,
    t: "Restricting privileges is possible but needs a plan for updates, plus tested backups.",
    p: "Locking the toolbox can stop the repair crew doing scheduled work.",
    refs: ["https://developer.wordpress.org/advanced-administration/security/hardening/"]
  },
  {
    id: "q-0377",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "What can a web application firewall (WAF) do, and what can't it?",
    o: [
      "It can block known attack patterns and bad traffic, but it doesn't fix vulnerable code",
      "It makes escaping unnecessary",
      "It replaces updates",
      "It guarantees no breaches"
    ],
    a: 0,
    t: "A WAF is a useful layer, not a substitute for patching and secure code.",
    p: "A guard at the gate helps, but you still need good locks inside.",
    refs: ["https://owasp.org/www-community/Web_Application_Firewall"]
  },
  {
    id: "q-0378",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "Why think twice before submitting a domain to the HSTS preload list?",
    o: [
      "It slows the site",
      "It breaks the REST API",
      "Browsers then refuse plain HTTP for the domain and all subdomains, and removal takes a long time",
      "It disables cookies"
    ],
    a: 2,
    t: "hstspreload.org warns that preloading is effectively permanent for a while. Every subdomain must support HTTPS first.",
    p: "It's easy to sign up and slow to undo.",
    refs: ["https://hstspreload.org/"]
  },
  {
    id: "q-0379",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "Which wp-config.php constant blocks plugin and theme installs, updates and file edits from wp-admin, for a Git-deployed site?",
    o: ["DISALLOW_FILE_MODS", "AUTOMATIC_UPDATER_DISABLED only", "WP_AUTO_UPDATE_CORE", "DISALLOW_FILE_EDIT"],
    a: 0,
    t: "DISALLOW_FILE_MODS goes further than DISALLOW_FILE_EDIT: it also stops installs and updates, so code only changes through deployment.",
    p: "Only the deploy pipeline may change the code.",
    refs: ["https://developer.wordpress.org/advanced-administration/wordpress/wp-config/"]
  },
  {
    id: "q-0380",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "Which constant forces logins and wp-admin over HTTPS?",
    o: ["FORCE_HTTPS_LOGIN", "WP_HTTPS", "FORCE_SSL_ADMIN", "SSL_ONLY"],
    a: 2,
    t: "FORCE_SSL_ADMIN makes admin sessions and logins use SSL. Most sites today serve everything over HTTPS anyway.",
    p: "Make the back office use the secure entrance.",
    refs: ["https://developer.wordpress.org/advanced-administration/security/https/"]
  },
  {
    id: "q-0381",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "Behind a load balancer that ends TLS, WordPress thinks every request is HTTP and loops redirects. What's the fix?",
    o: [
      "Set $_SERVER['HTTPS'] = 'on' in wp-config.php when the trusted proxy sends X-Forwarded-Proto: https",
      "Change siteurl to http",
      "Turn off HTTPS",
      "Disable FORCE_SSL_ADMIN"
    ],
    a: 0,
    t: "WordPress checks $_SERVER['HTTPS']. The handbook shows mapping the proxy's header so is_ssl() is correct.",
    p: "Tell WordPress the front door is secure even though the back corridor isn't.",
    refs: [
      "https://developer.wordpress.org/advanced-administration/security/https/",
      "https://developer.wordpress.org/reference/functions/is_ssl/"
    ]
  },
  {
    id: "q-0382",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "Why is rate limiting by the X-Forwarded-For header risky?",
    o: [
      "It's always empty",
      "Clients can set or spoof it unless it's added by a proxy you trust, so attackers can dodge limits or frame others",
      "Browsers block it",
      "It contains passwords"
    ],
    a: 1,
    t: "Only trust forwarded headers set by your own proxies, and take the right entry from the chain.",
    p: "Anyone can write any return address on a letter.",
    refs: ["https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For"]
  },
  {
    id: "q-0383",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "You output a PHP array into an inline <script> block. What's the correct escaping?",
    o: [
      "esc_html() the whole block",
      "No escaping is needed inside script tags",
      "Encode it with wp_json_encode() (JSON is the JavaScript context escape)",
      "esc_attr() each value"
    ],
    a: 2,
    t: "Each output context needs its own escaping. In JavaScript, JSON encoding prevents breaking out of the string or script.",
    p: "Use the wrapping that matches where the data is going.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_json_encode/",
      "https://developer.wordpress.org/apis/security/escaping/"
    ]
  },
  {
    id: "q-0384",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "Since WordPress 6.2, how do you safely insert a table or column name into a prepared query?",
    o: [
      "esc_sql() around the name",
      "Use %s",
      "Concatenate it after sanitize_key()",
      "The %i identifier placeholder in $wpdb->prepare()"
    ],
    a: 3,
    t: "%i quotes identifiers correctly. %s would quote it as a string value.",
    p: "Use the placeholder made for names, not values.",
    refs: ["https://developer.wordpress.org/reference/classes/wpdb/prepare/"]
  },
  {
    id: "q-0385",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "Which official tool checks a plugin against WordPress.org directory requirements and common security issues before submission?",
    o: ["The Plugin Check plugin", "WP-CLI doctor", "Query Monitor", "Health Check"],
    a: 0,
    t: "Plugin Check runs static checks (including PHPCS-based ones) aligned with directory guidelines.",
    p: "It's the directory's own pre-flight checklist.",
    refs: ["https://wordpress.org/plugins/plugin-check/"]
  },
  {
    id: "q-0386",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "You find a security bug in WordPress core. Where should you report it?",
    o: [
      "Social media",
      "Privately, through the process on WordPress.org's security page, not a public ticket",
      "The support forums",
      "A public Trac ticket"
    ],
    a: 1,
    t: "Core vulnerabilities go through the private disclosure process so a fix can ship before details are public.",
    p: "Tell the locksmith quietly before telling the world the lock is broken.",
    refs: ["https://wordpress.org/about/security/"]
  },
  {
    id: "q-0387",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "After a suspected account takeover, how do you log the user out of every device from code?",
    o: [
      "Delete their cookies in your browser",
      "Clear the object cache",
      "Destroy their sessions with WP_Session_Tokens (for example destroy_all())",
      "Change the site title"
    ],
    a: 2,
    t: "Session tokens are stored per user. Destroying them invalidates every login cookie for that user.",
    p: "Cancel every key they had, wherever it is.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_session_tokens/"]
  },
  {
    id: "q-0388",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "Why should application and security logs be shipped off the web server?",
    o: [
      "WordPress can't write logs",
      "An attacker who compromises the server can delete or alter local logs",
      "It makes PHP faster",
      "Local disks can't store logs"
    ],
    a: 1,
    t: "OWASP recommends protecting log integrity. Central, append-only storage keeps evidence safe.",
    p: "Keep the CCTV recordings somewhere the burglar can't reach.",
    refs: ["https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html"]
  },
  {
    id: "q-0389",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "Which filters register a plugin's personal data exporter and eraser with WordPress's privacy tools?",
    o: [
      "user_has_cap",
      "wp_privacy_personal_data_exporters and wp_privacy_personal_data_erasers",
      "wp_privacy_export",
      "privacy_policy_content only"
    ],
    a: 1,
    t: "Registering exporters and erasers lets site owners include your plugin's data in core export and erasure requests.",
    p: "Plug your data into WordPress's \"download my data\" and \"delete my data\" tools.",
    refs: [
      "https://developer.wordpress.org/reference/hooks/wp_privacy_personal_data_exporters/",
      "https://developer.wordpress.org/reference/hooks/wp_privacy_personal_data_erasers/"
    ]
  },
  {
    id: "q-0390",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "What can the public REST users endpoint (/wp/v2/users) reveal on a default install?",
    o: [
      "Nothing at all",
      "Password hashes",
      "Email addresses to everyone",
      "Author display names and slugs, which may match login names"
    ],
    a: 3,
    t: "The user schema includes a slug. Sites that care can restrict the endpoint and make sure slugs differ from logins.",
    p: "It can hint at usernames, which gives guessers a head start.",
    refs: ["https://developer.wordpress.org/rest-api/reference/users/"]
  },
  {
    id: "q-0391",
    s: "WordPress Core", d: 3, level: "Administrator", stage: 1,
    q: "How do you enable the Network Setup screen to turn a site into multisite?",
    o: [
      "Settings → General",
      "Install a plugin",
      "wp core multisite on",
      "Add define( 'WP_ALLOW_MULTISITE', true ); to wp-config.php"
    ],
    a: 3,
    t: "WP_ALLOW_MULTISITE reveals Tools → Network Setup, which then gives the remaining constants and rewrite rules.",
    p: "Flip the switch that reveals the network setup page.",
    refs: ["https://developer.wordpress.org/advanced-administration/multisite/create-network/"]
  },
  {
    id: "q-0392",
    s: "WordPress Core", d: 3, level: "Administrator", stage: 1,
    q: "Why does the choice between subdomains and subdirectories matter when creating a network?",
    o: [
      "Subdirectories are faster",
      "Changing it later isn't easy, so decide up front",
      "Subdomains can't use HTTPS",
      "It only affects the admin colour"
    ],
    a: 1,
    t: "The handbook notes the structure can be changed after installation, but reconfiguring it might not be easy.",
    p: "Pick the street layout before building the houses.",
    refs: ["https://developer.wordpress.org/advanced-administration/multisite/create-network/"]
  },
  {
    id: "q-0393",
    s: "WordPress Core", d: 3, level: "Administrator", stage: 1,
    q: "On multisite, which data is shared by every site in the network?",
    o: ["Users (wp_users and wp_usermeta)", "Options", "Comments", "Posts"],
    a: 0,
    t: "Each site has its own content tables, but user accounts are network-wide. Roles are assigned per site.",
    p: "One staff list for the whole network, separate rooms for each site.",
    refs: ["https://developer.wordpress.org/advanced-administration/multisite/"]
  },
  {
    id: "q-0394",
    s: "WordPress Core", d: 3, level: "Administrator", stage: 1,
    q: "Which capability lets a Super Admin manage network settings?",
    o: [
      "edit_users",
      "activate_plugins",
      "manage_options",
      "manage_network (and related manage_network_* capabilities)"
    ],
    a: 3,
    t: "Network-level capabilities are held only by Super Admins.",
    p: "Network powers belong only to the network boss.",
    refs: ["https://wordpress.org/documentation/article/roles-and-capabilities/"]
  },
  {
    id: "q-0395",
    s: "WordPress Core", d: 3, level: "Administrator", stage: 1,
    q: "Users on a multisite with mapped domains get logged out when moving between sites. Which wp-config.php constant is commonly involved?",
    o: ["COOKIE_DOMAIN", "NOBLOGREDIRECT", "WP_HOME", "WP_DEBUG"],
    a: 0,
    t: "COOKIE_DOMAIN controls which domain cookies are set for. A wrong value causes login loops or lost sessions.",
    p: "The login ticket only works for the address it was issued for.",
    refs: ["https://developer.wordpress.org/advanced-administration/wordpress/wp-config/"]
  },
  {
    id: "q-0396",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "During a code review you see extract( $_POST ). Why is it a problem?",
    o: [
      "It's deprecated in PHP 8",
      "It's slow",
      "It only works with GET",
      "It turns request keys into variables, so an attacker can overwrite variables your code relies on"
    ],
    a: 3,
    t: "PHP's manual warns against using extract() on untrusted data such as user input.",
    p: "It lets strangers rename your labelled boxes.",
    refs: ["https://www.php.net/manual/en/function.extract.php"]
  },
  {
    id: "q-0397",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "What do the WordPress.org plugin guidelines say about obfuscated code?",
    o: [
      "Only JavaScript may be obfuscated",
      "Obfuscation is fine for premium features",
      "It's required for licence checks",
      "Code must be human-readable; obfuscation isn't allowed"
    ],
    a: 3,
    t: "The guidelines require readable code so reviewers and users can see what it does.",
    p: "No hiding what the code does.",
    refs: ["https://developer.wordpress.org/plugins/wordpress-org/detailed-plugin-guidelines/"]
  },
  {
    id: "q-0398",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "Which statements about security layers are true?",
    o: [
      "Updating plugins promptly reduces exposure to known vulnerabilities",
      "Capability checks are needed even when a nonce is valid",
      "A valid nonce proves the user has permission",
      "Escaping output still matters behind a WAF"
    ],
    a: [0, 1, 3],
    t: "Nonces confirm intent, not permission. Defence in depth means escaping, capability checks and patching all still apply.",
    p: "Several locks, each doing a different job.",
    refs: [
      "https://developer.wordpress.org/apis/security/nonces/",
      "https://developer.wordpress.org/apis/security/escaping/"
    ]
  },
  {
    id: "q-0399",
    s: "Security", d: 3, level: "Administrator", stage: 1,
    q: "Which statements about Application Passwords are true?",
    o: [
      "They're meant for API access, not wp-admin logins",
      "They should be sent only over HTTPS",
      "Each can be revoked on its own",
      "They grant more capabilities than the user has"
    ],
    a: [0, 1, 2],
    t: "Application Passwords act as the user (no extra capabilities), work for API requests, can be revoked individually and need HTTPS.",
    p: "App keys open the API door only, can be cancelled one by one, and must travel securely.",
    refs: ["https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/"]
  },
  {
    id: "q-0400",
    s: "Performance", d: 3, level: "Administrator", stage: 2,
    q: "What enables a full-page caching drop-in (advanced-cache.php) to load early?",
    o: [
      "Activating any plugin",
      "Settings → Reading",
      "define( 'WP_CACHE', true ); in wp-config.php",
      "WP_DEBUG"
    ],
    a: 2,
    t: "With WP_CACHE true, WordPress loads wp-content/advanced-cache.php very early, before most of core.",
    p: "Flip the switch so the fast-lane file is checked first.",
    refs: ["https://developer.wordpress.org/advanced-administration/wordpress/wp-config/"]
  },
  {
    id: "q-0401",
    s: "Scalability", d: 3, level: "Administrator", stage: 2,
    q: "How do cache tags (surrogate keys) improve CDN invalidation?",
    o: [
      "Pages are tagged with the content they include, so updating one post purges every page tagged with it",
      "They make caches permanent",
      "They encrypt cached pages",
      "They're only for images"
    ],
    a: 0,
    t: "Tag-based purging removes exactly the affected pages without clearing everything.",
    p: "Label each page with what's in it, then clear by label.",
    refs: ["https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/"]
  },
  {
    id: "q-0402",
    s: "Performance", d: 3, level: "Administrator", stage: 2,
    q: "What does Time to First Byte (TTFB) mainly reflect?",
    o: [
      "JavaScript execution time",
      "How long images take to decode",
      "How long the server and network take before the first byte of the response arrives",
      "Layout shift"
    ],
    a: 2,
    t: "TTFB includes redirects, DNS, connection and server processing. A slow TTFB delays every later metric.",
    p: "How long before the first word of the reply arrives.",
    refs: ["https://web.dev/articles/ttfb"]
  },
  {
    id: "q-0403",
    s: "Performance", d: 3, level: "Administrator", stage: 2,
    q: "Which three metrics make up the current Core Web Vitals?",
    o: ["LCP, FID and FCP", "FID, CLS and TTI", "LCP, INP and CLS", "TTFB, FCP and TBT"],
    a: 2,
    t: "Largest Contentful Paint, Interaction to Next Paint and Cumulative Layout Shift. INP replaced FID in 2024.",
    p: "Loading, responsiveness and visual stability.",
    refs: ["https://web.dev/articles/vitals"]
  },
  {
    id: "q-0404",
    s: "Performance", d: 3, level: "Administrator", stage: 2,
    q: "How can you see server-side timing (database, cache, PHP) in the browser's network panel?",
    o: [
      "Use console.log in PHP",
      "Add a <meta> tag",
      "Send a Server-Timing response header with named metrics",
      "It isn't possible"
    ],
    a: 2,
    t: "Server-Timing exposes backend durations to browser DevTools. Limit it to trusted users if the values are sensitive.",
    p: "The server attaches a stopwatch reading to its reply.",
    refs: ["https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Server-Timing"]
  },
  {
    id: "q-0405",
    s: "Scalability", d: 3, level: "Administrator", stage: 2,
    q: "Before a big launch, how do you find the traffic level at which the site starts failing?",
    o: [
      "Wait for launch day",
      "Ask the host",
      "Load test a production-like environment with a tool such as k6, increasing load until errors or latency rise",
      "Check Site Health"
    ],
    a: 2,
    t: "Load tests reveal bottlenecks (workers, database, cache) before real users do.",
    p: "Rehearse the rush before opening the doors.",
    refs: ["https://grafana.com/docs/k6/latest/"]
  },
  {
    id: "q-0406",
    s: "Scalability", d: 3, level: "Administrator", stage: 2,
    q: "Average response time is 0.5 s and you expect 100 requests per second reaching PHP. Roughly how many requests are in progress at once?",
    o: [
      "About 50, by Little's law (concurrency = arrival rate × time in system)",
      "100 exactly",
      "About 200",
      "About 5"
    ],
    a: 0,
    t: "Little's law, L = λW: 100 × 0.5 = 50 concurrent requests, which helps size PHP workers (plus headroom).",
    p: "Customers arriving per second times how long each stays tells you how many are inside.",
    refs: ["https://en.wikipedia.org/wiki/Little%27s_law"]
  },
  {
    id: "q-0407",
    s: "Performance", d: 3, level: "Administrator", stage: 2,
    q: "Which MySQL setting has the biggest effect on keeping InnoDB data and indexes in memory?",
    o: ["query_cache_size", "max_allowed_packet", "wait_timeout", "innodb_buffer_pool_size"],
    a: 3,
    t: "The buffer pool caches table and index data. Too small and reads hit disk constantly.",
    p: "It's how much of the filing cabinet the database keeps on the desk.",
    refs: ["https://dev.mysql.com/doc/refman/8.0/en/innodb-buffer-pool.html"]
  },
  {
    id: "q-0408",
    s: "Debugging", d: 3, level: "Administrator", stage: 2,
    q: "How do you find which queries are slow on the database server over a whole day?",
    o: [
      "Check Site Health",
      "Enable MySQL's slow query log with a sensible long_query_time",
      "Use the browser network panel",
      "Turn on WP_DEBUG_DISPLAY"
    ],
    a: 1,
    t: "The slow query log captures queries above a threshold from every request, not just the ones you test.",
    p: "Let the database keep a list of its slowest jobs.",
    refs: ["https://dev.mysql.com/doc/refman/8.0/en/slow-query-log.html"]
  },
  {
    id: "q-0409",
    s: "Performance", d: 3, level: "Administrator", stage: 2,
    q: "A custom table is queried with WHERE site_id = ? AND created_at > ? ORDER BY created_at. Which index helps most?",
    o: [
      "Separate indexes on each column only",
      "No index",
      "A composite index on (site_id, created_at)",
      "An index on created_at only"
    ],
    a: 2,
    t: "With the leftmost-prefix rule, (site_id, created_at) serves the equality filter, the range and the sort.",
    p: "One index sorted the same way you search.",
    refs: ["https://dev.mysql.com/doc/refman/8.0/en/multiple-column-indexes.html"]
  },
  {
    id: "q-0410",
    s: "Scalability", d: 3, level: "Administrator", stage: 2,
    q: "Which Redis eviction policy suits a WordPress object cache?",
    o: [
      "volatile-ttl only",
      "noeviction",
      "allkeys-lru (evict least recently used keys when memory is full)",
      "Persist everything to disk"
    ],
    a: 2,
    t: "Redis recommends allkeys-lru as a good default when some keys are used far more than others. With noeviction, writes fail when full.",
    p: "When the desk is full, clear what you haven't touched lately.",
    refs: ["https://redis.io/docs/latest/develop/reference/eviction/"]
  },
  {
    id: "q-0411",
    s: "Scalability", d: 3, level: "Administrator", stage: 2,
    q: "Why must code never treat the object cache as the source of truth?",
    o: [
      "Entries can be evicted or flushed at any time, so data must be recoverable from the database",
      "It's per-user",
      "It's read-only",
      "It's slower than MySQL"
    ],
    a: 0,
    t: "Caches are disposable. Code should regenerate data on a miss.",
    p: "Short-term memory forgets. Keep the real record elsewhere.",
    refs: ["https://developer.wordpress.org/advanced-administration/performance/cache/"]
  },
  {
    id: "q-0412",
    s: "Performance", d: 3, level: "Administrator", stage: 2,
    q: "Which SQL finds how much data is autoloaded on every request (WordPress 6.6+ values)?",
    o: [
      "SELECT COUNT(*) FROM wp_posts",
      "SELECT * FROM wp_options WHERE autoload = 'no'",
      "SELECT SUM(LENGTH(option_value)) FROM wp_options WHERE autoload IN ('yes','on','auto-on','auto')",
      "SHOW TABLE STATUS"
    ],
    a: 2,
    t: "Summing autoloaded values shows the payload loaded each request. Large totals point to options to un-autoload.",
    p: "Weigh everything loaded on every page.",
    refs: ["https://make.wordpress.org/core/2024/06/18/options-api-disabling-autoload-for-large-options/"]
  },
  {
    id: "q-0413",
    s: "Performance", d: 3, level: "Administrator", stage: 2,
    q: "Why is SQL_CALC_FOUND_ROWS (used by WP_Query for pagination) something to avoid on large tables?",
    o: [
      "It forces MySQL to count every matching row, and it's deprecated as of MySQL 8.0.17",
      "It locks the table",
      "It's only for MyISAM",
      "It returns wrong results"
    ],
    a: 0,
    t: "Skip it with no_found_rows when you don't need totals, or count separately and cache the result.",
    p: "Counting every match is expensive when you only show ten.",
    refs: ["https://dev.mysql.com/doc/refman/8.0/en/information-functions.html"]
  },
  {
    id: "q-0414",
    s: "Performance", d: 3, level: "Administrator", stage: 2,
    q: "With HTTP/2, why is bundling every CSS and JS file into one less important than it used to be?",
    o: [
      "Bundles are not cacheable",
      "Browsers block bundles",
      "HTTP/2 multiplexes many requests over one connection, reducing per-request overhead",
      "HTTP/2 compresses JavaScript automatically"
    ],
    a: 2,
    t: "Multiplexing lowers the cost of several files, so smaller, separately cached files can be better.",
    p: "Many small parcels in one truck instead of one truck per parcel.",
    refs: ["https://developer.mozilla.org/en-US/docs/Glossary/HTTP_2"]
  },
  {
    id: "q-0415",
    s: "Performance", d: 3, level: "Administrator", stage: 2,
    q: "Which response header tells you the server compressed a text response with Brotli?",
    o: ["Transfer-Encoding: chunked", "Content-Type: br", "Accept-Encoding: br", "Content-Encoding: br"],
    a: 3,
    t: "The browser advertises support in Accept-Encoding, and the server answers with Content-Encoding.",
    p: "The reply label says how it was squeezed.",
    refs: ["https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Encoding"]
  },
  {
    id: "q-0416",
    s: "Performance", d: 3, level: "Administrator", stage: 2,
    q: "Which filter adds preconnect or dns-prefetch hints for a third-party origin you always use?",
    o: ["style_loader_src", "wp_head", "script_loader_tag only", "wp_resource_hints"],
    a: 3,
    t: "wp_resource_hints lets you add origins per relation type, so the browser can connect early.",
    p: "Warm up the connection before you need it.",
    refs: ["https://developer.wordpress.org/reference/hooks/wp_resource_hints/"]
  },
  {
    id: "q-0417",
    s: "Performance", d: 3, level: "Administrator", stage: 2,
    q: "What does WordPress 6.8's speculative loading do by default?",
    o: [
      "Uses the Speculation Rules API to prefetch likely next pages with conservative eagerness",
      "Prerenders every link on load",
      "Loads images earlier",
      "Caches pages on the server"
    ],
    a: 0,
    t: "Core adds a default speculation rule for conservative prefetching, which can improve LCP on navigation.",
    p: "The browser quietly fetches the page you're about to click.",
    refs: ["https://make.wordpress.org/core/2025/03/06/speculative-loading-in-6-8/"]
  },
  {
    id: "q-0418",
    s: "Performance", d: 3, level: "Administrator", stage: 2,
    q: "How do you load a block's stylesheet only on pages that contain that block?",
    o: [
      "wp_enqueue_block_style(), with separate block assets loading enabled",
      "Inline it in header.php",
      "Use @import in style.css",
      "Enqueue it on every page"
    ],
    a: 0,
    t: "wp_enqueue_block_style() attaches styles to a block so they print only when it renders.",
    p: "Bring the block's styling only when the block shows up.",
    refs: [
      "https://developer.wordpress.org/reference/functions/wp_enqueue_block_style/",
      "https://developer.wordpress.org/reference/hooks/should_load_separate_core_block_assets/"
    ]
  },
  {
    id: "q-0419",
    s: "Scalability", d: 3, level: "Administrator", stage: 2,
    q: "On a site using Elasticsearch for queries, what should remain the source of truth?",
    o: [
      "The Elasticsearch index",
      "The object cache",
      "The CDN",
      "The WordPress database; the search index can lag and is rebuilt from it"
    ],
    a: 3,
    t: "Indexing is asynchronous, so there can be a delay between a change in WordPress and the index.",
    p: "The search index is a copy; the database is the original.",
    refs: ["https://docs.wpvip.com/wordpress-on-vip/search-options/elasticsearch/"]
  },
  {
    id: "q-0420",
    s: "Scalability", d: 3, level: "Administrator", stage: 2,
    q: "You run ten web nodes. How should WP-Cron run?",
    o: [
      "Disable request-triggered cron and run due events from one scheduled runner (for example wp cron event run --due-now)",
      "Run it on the database server inside MySQL",
      "Don't use cron at scale",
      "Let every node trigger it on page loads"
    ],
    a: 0,
    t: "One runner avoids duplicate and racing runs across nodes and keeps timing reliable.",
    p: "One alarm clock for the whole building, not one per room.",
    refs: [
      "https://developer.wordpress.org/cli/commands/cron/event/run/",
      "https://developer.wordpress.org/plugins/cron/hooking-wp-cron-into-the-system-task-scheduler/"
    ]
  },
  {
    id: "q-0421",
    s: "Scalability", d: 3, level: "Administrator", stage: 2,
    q: "After scaling to more PHP workers, the database starts refusing connections. Which setting is likely too low?",
    o: ["innodb_log_file_size", "upload_max_filesize", "MySQL max_connections", "memory_limit"],
    a: 2,
    t: "Each PHP worker can hold a database connection. Workers across all nodes must fit within max_connections.",
    p: "More cashiers need more phone lines to the warehouse.",
    refs: ["https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html"]
  },
  {
    id: "q-0422",
    s: "Performance", d: 3, level: "Administrator", stage: 2,
    q: "A one-off WP-CLI script runs a query whose results won't be reused. Which WP_Query argument skips adding the posts to the object cache?",
    o: [
      "'suppress_filters' => false",
      "'no_found_rows' => false",
      "'cache_results' => false",
      "'fields' => 'all'"
    ],
    a: 2,
    t: "cache_results false avoids filling the cache with data you won't read again, which helps long batch jobs.",
    p: "Don't keep a copy of something you'll only look at once.",
    refs: ["https://developer.wordpress.org/reference/classes/wp_query/"]
  },
  {
    id: "q-0423",
    s: "Scalability", d: 3, level: "Administrator", stage: 2,
    q: "Which statements about scaling WordPress horizontally are true?",
    o: [
      "Each node needs the same code and configuration",
      "Cron should run from one place",
      "Uploads must be shared or offloaded",
      "Each node can keep its own separate persistent object cache"
    ],
    a: [0, 1, 2],
    t: "Separate caches per node serve stale or inconsistent data. Nodes must be interchangeable.",
    p: "Every server should be a perfect twin sharing the same memory and files.",
    refs: ["https://developer.wordpress.org/advanced-administration/performance/cache/"]
  },
  {
    id: "q-0424",
    s: "Performance", d: 3, level: "Administrator", stage: 2,
    q: "Which statements about Core Web Vitals and WordPress are true?",
    o: [
      "Heavy JavaScript on interactions can hurt INP",
      "INP measures the first input only",
      "Images without width and height can cause layout shift",
      "Lazy-loading the LCP image can make LCP worse"
    ],
    a: [0, 2, 3],
    t: "INP looks at interactions across the page visit, not just the first. Dimensions reserve space, and the hero image shouldn't be deferred.",
    p: "Show the main picture first, save space for images, and keep clicks snappy.",
    refs: ["https://web.dev/articles/vitals"]
  },
  {
    id: "q-0425",
    s: "Change Management", d: 3, level: "Administrator", stage: 3,
    q: "In incident response, what's the incident commander's main job?",
    o: [
      "Finding who caused it",
      "Talking to the press only",
      "Coordinating the response and communication, delegating hands-on work to others",
      "Writing the fix personally"
    ],
    a: 2,
    t: "Google's SRE guidance separates coordination from technical work, so someone keeps the big picture.",
    p: "One person directs traffic while others fix the car.",
    refs: ["https://sre.google/sre-book/managing-incidents/"]
  },
  {
    id: "q-0426",
    s: "Change Management", d: 3, level: "Administrator", stage: 3,
    q: "What's the difference between an SLI, an SLO and an SLA?",
    o: [
      "They're synonyms",
      "SLA is internal, SLO is legal",
      "SLI is a measured metric, SLO is the target for it, SLA is a contract with consequences",
      "SLI is the budget"
    ],
    a: 2,
    t: "For example: SLI = share of requests under 500 ms, SLO = 99% of them, SLA = refunds if below an agreed level.",
    p: "What you measure, what you aim for, and what you promise.",
    refs: ["https://sre.google/sre-book/service-level-objectives/"]
  },
  {
    id: "q-0427",
    s: "Change Management", d: 3, level: "Administrator", stage: 3,
    q: "Your SLO is 99.9% availability. What's the error budget for, in practice?",
    o: [
      "Paying for outages",
      "Measuring developer speed",
      "Buying servers",
      "Deciding how much risk to take: releases continue while budget remains, and reliability work comes first when it's spent"
    ],
    a: 3,
    t: "The 0.1% allowed failure is a budget that balances shipping speed against reliability.",
    p: "You have a small allowance for mistakes. Spend it wisely.",
    refs: ["https://sre.google/sre-book/service-level-objectives/"]
  },
  {
    id: "q-0428",
    s: "Change Management", d: 3, level: "Administrator", stage: 3,
    q: "What's a canary release?",
    o: [
      "A release with no tests",
      "Releasing on Fridays",
      "Deploying only to staging",
      "Rolling a change out to a small share of users or servers first and watching metrics before going wider"
    ],
    a: 3,
    t: "Canaries limit the blast radius of a bad change.",
    p: "Let a few people try it before everyone does.",
    refs: ["https://martinfowler.com/bliki/CanaryRelease.html"]
  },
  {
    id: "q-0429",
    s: "Change Management", d: 3, level: "Administrator", stage: 3,
    q: "Why build a release artifact once and promote that same artifact through staging to production?",
    o: [
      "It saves disk space",
      "What you tested is exactly what you ship; rebuilding per environment can introduce differences",
      "Production can't run builds",
      "It's required by WordPress"
    ],
    a: 1,
    t: "The twelve-factor approach separates build, release and run stages, so a build is immutable.",
    p: "Ship the exact box you inspected, not a fresh one packed later.",
    refs: ["https://12factor.net/build-release-run"]
  },
  {
    id: "q-0430",
    s: "Change Management", d: 3, level: "Administrator", stage: 3,
    q: "Where should environment-specific configuration (database hosts, API keys) live?",
    o: [
      "Hard-coded per branch",
      "In environment variables or config outside the code, so one build runs anywhere",
      "In the theme",
      "In post meta"
    ],
    a: 1,
    t: "The twelve-factor app stores config in the environment, separate from code.",
    p: "Same code everywhere, settings supplied by each place.",
    refs: ["https://12factor.net/config"]
  },
  {
    id: "q-0431",
    s: "Change Management", d: 3, level: "Administrator", stage: 3,
    q: "You need to rename a database column without downtime while old and new code run side by side. Which pattern fits?",
    o: [
      "Ask users to log out",
      "Drop the table and recreate it",
      "Rename it during deploy and hope",
      "Expand and contract: add the new column, write to both, migrate reads, then remove the old one"
    ],
    a: 3,
    t: "Parallel change (expand/contract) keeps both versions working during the transition.",
    p: "Build the new road before closing the old one.",
    refs: ["https://martinfowler.com/bliki/ParallelChange.html"]
  },
  {
    id: "q-0432",
    s: "Change Management", d: 3, level: "Administrator", stage: 3,
    q: "Under semantic versioning, how should you deprecate a public function used by others?",
    o: [
      "Deprecate and remove in the same release",
      "Rename it without notice",
      "Remove it in a patch release",
      "Mark it deprecated in a minor release, keep it working, and remove it only in the next major version"
    ],
    a: 3,
    t: "semver.org advises deprecating in a minor release before removing in a major one, giving users time.",
    p: "Warn first, remove later.",
    refs: ["https://semver.org/"]
  },
  {
    id: "q-0433",
    s: "Security", d: 3, level: "Administrator", stage: 3,
    q: "What does GitHub Dependabot help with in a plugin repository?",
    o: [
      "Writing tests",
      "Translating strings",
      "Alerts and pull requests for vulnerable or outdated dependencies (for example Composer and npm)",
      "Deploying to production"
    ],
    a: 2,
    t: "Automated dependency updates reduce the window during which known vulnerabilities stay in your code.",
    p: "A robot that says \"this library needs updating\" and drafts the change.",
    refs: ["https://docs.github.com/en/code-security/dependabot"]
  },
  {
    id: "q-0434",
    s: "Change Management", d: 3, level: "Administrator", stage: 3,
    q: "What can branch protection rules on main enforce?",
    o: [
      "Required reviews and passing status checks before merging, and no force-pushes",
      "Hiding the branch",
      "Faster CI",
      "Automatic deployments"
    ],
    a: 0,
    t: "Protected branches stop unreviewed or failing code from landing on the shared branch.",
    p: "The main branch only accepts checked and approved work.",
    refs: [
      "https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches"
    ]
  },
  {
    id: "q-0435",
    s: "Disaster Recovery", d: 3, level: "Administrator", stage: 3,
    q: "Why does ransomware guidance recommend offline or immutable backup copies?",
    o: [
      "They restore faster",
      "Attackers often encrypt or delete reachable backups too",
      "They don't need testing",
      "They're cheaper"
    ],
    a: 1,
    t: "CISA's guide recommends offline, encrypted backups that are tested regularly.",
    p: "Keep one copy where the attacker's hands can't reach.",
    refs: ["https://www.cisa.gov/stopransomware/ransomware-guide"]
  },
  {
    id: "q-0436",
    s: "Disaster Recovery", d: 3, level: "Administrator", stage: 3,
    q: "How does DNS failover move traffic to a standby site when the primary fails?",
    o: [
      "The CDN rewrites PHP",
      "Health checks mark the primary unhealthy and DNS answers switch to the secondary",
      "WordPress redirects automatically",
      "Browsers detect the outage"
    ],
    a: 1,
    t: "Managed DNS with health checks can answer with the standby's address. Low TTLs shorten the switch.",
    p: "The phone book starts giving out the backup number when the main one stops answering.",
    refs: ["https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html"]
  },
  {
    id: "q-0437",
    s: "Disaster Recovery", d: 3, level: "Administrator", stage: 3,
    q: "Why run regular restore drills (\"game days\")?",
    o: [
      "To prove the recovery procedure works and meets RTO and RPO before a real incident",
      "Because backups expire",
      "To test the CDN",
      "To generate reports"
    ],
    a: 0,
    t: "The AWS reliability guidance stresses testing recovery procedures, not just taking backups.",
    p: "Practise the fire drill before there's a fire.",
    refs: ["https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html"]
  },
  {
    id: "q-0438",
    s: "Disaster Recovery", d: 3, level: "Administrator", stage: 3,
    q: "Which guidance covers writing an IT contingency (recovery) plan, including roles, procedures and testing?",
    o: ["OWASP ASVS", "PSR-12", "RFC 5861", "NIST SP 800-34"],
    a: 3,
    t: "NIST SP 800-34 is the contingency planning guide, which also defines RTO and RPO.",
    p: "It's a standard handbook for planning recovery.",
    refs: ["https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final"]
  },
  {
    id: "q-0439",
    s: "Disaster Recovery", d: 3, level: "Administrator", stage: 3,
    q: "Which mysqldump option gives a consistent backup of InnoDB tables without locking them for the whole dump?",
    o: ["--lock-all-tables", "--no-data", "--skip-opt", "--single-transaction"],
    a: 3,
    t: "--single-transaction dumps from one consistent snapshot while the site keeps writing.",
    p: "Take a photo of the data at one instant, without stopping the shop.",
    refs: ["https://dev.mysql.com/doc/refman/8.0/en/mysqldump.html"]
  },
  {
    id: "q-0440",
    s: "Disaster Recovery", d: 3, level: "Administrator", stage: 3,
    q: "How do you pass extra mysqldump options through WP-CLI's database export?",
    o: [
      "Edit wp-config.php",
      "You can't",
      "Add them to wp db export, for example wp db export --single-transaction",
      "Use wp db optimize"
    ],
    a: 2,
    t: "wp db export passes extra arguments on to mysqldump.",
    p: "Hand the extra options straight to the dump tool.",
    refs: ["https://developer.wordpress.org/cli/commands/db/export/"]
  },
  {
    id: "q-0441",
    s: "Security", d: 3, level: "Administrator", stage: 3,
    q: "During a security incident, why preserve logs and a copy of the affected system before cleaning?",
    o: [
      "Evidence is needed to find the entry point and scope; cleaning first destroys it",
      "It speeds up cleaning",
      "Hosts require it",
      "It isn't necessary"
    ],
    a: 0,
    t: "NIST incident response guidance includes evidence gathering and analysis as part of handling an incident.",
    p: "Photograph the scene before tidying it.",
    refs: ["https://csrc.nist.gov/pubs/sp/800/61/r3/final"]
  },
  {
    id: "q-0442",
    s: "Debugging", d: 3, level: "Administrator", stage: 3,
    q: "Which PHP function reports the most memory a request has used so far?",
    o: [
      "memory_get_usage() only",
      "ini_get( 'memory_limit' )",
      "gc_collect_cycles()",
      "memory_get_peak_usage()"
    ],
    a: 3,
    t: "Logging peak usage at the end of a request shows which pages approach the memory limit.",
    p: "It tells you the highest the tide has risen.",
    refs: ["https://www.php.net/manual/en/function.memory-get-peak-usage.php"]
  },
  {
    id: "q-0443",
    s: "Debugging", d: 3, level: "Administrator", stage: 3,
    q: "Which tool produces a function-by-function profile of where PHP spends time on a request?",
    o: [
      "WP_DEBUG_LOG",
      "Xdebug's profiler (cachegrind output viewed in a visualiser)",
      "Site Health",
      "PHPCS"
    ],
    a: 1,
    t: "A profiler records time and calls per function, showing hot paths a log can't.",
    p: "It times every step so you can see which one is slow.",
    refs: ["https://xdebug.org/docs/profiler"]
  },
  {
    id: "q-0444",
    s: "Debugging", d: 3, level: "Administrator", stage: 3,
    q: "Imports occasionally fail with \"Deadlock found when trying to get lock\". Where do you see details of the last deadlock?",
    o: [
      "debug.log",
      "wp_options",
      "SHOW ENGINE INNODB STATUS (the LATEST DETECTED DEADLOCK section)",
      "The browser console"
    ],
    a: 2,
    t: "InnoDB reports the transactions and locks involved, which shows which queries conflict.",
    p: "Ask the database what two jobs were stuck waiting on each other.",
    refs: ["https://dev.mysql.com/doc/refman/8.0/en/innodb-deadlocks.html"]
  },
  {
    id: "q-0445",
    s: "Debugging", d: 3, level: "Administrator", stage: 3,
    q: "How do you check what the persistent object cache holds for a key from the command line?",
    o: ["wp transient list", "redis-cli is the only way", "wp option get <key>", "wp cache get <key> <group>"],
    a: 3,
    t: "wp cache get reads through WordPress's cache API, using the same groups and prefixes as your code.",
    p: "Ask WordPress what it remembers for that label.",
    refs: ["https://developer.wordpress.org/cli/commands/cache/get/"]
  },
  {
    id: "q-0446",
    s: "Debugging", d: 3, level: "Administrator", stage: 3,
    q: "Scheduled events seem to run late. Which WP-CLI command checks whether WP-Cron can spawn properly?",
    o: ["wp cron check", "wp cron test", "wp schedule test", "wp cron run-all"],
    a: 1,
    t: "wp cron test checks that WP-Cron is enabled and that the loopback request to wp-cron.php works.",
    p: "It checks the alarm clock can actually ring.",
    refs: ["https://developer.wordpress.org/cli/commands/cron/test/"]
  },
  {
    id: "q-0447",
    s: "Debugging", d: 3, level: "Administrator", stage: 3,
    q: "A custom URL returns 404. Which WP-CLI command shows the rewrite rules WordPress currently has?",
    o: ["wp option get permalinks", "wp rewrite flush --show", "wp route list", "wp rewrite list"],
    a: 3,
    t: "wp rewrite list prints rules and their matching queries, so you can see whether yours exists and in what order.",
    p: "List the address rules to see whether yours is there.",
    refs: ["https://developer.wordpress.org/cli/commands/rewrite/list/"]
  },
  {
    id: "q-0448",
    s: "Security", d: 3, level: "Administrator", stage: 3,
    q: "What should your error and debug logs avoid recording?",
    o: [
      "Error messages",
      "Request paths",
      "Passwords, tokens, session IDs and unnecessary personal data",
      "Timestamps"
    ],
    a: 2,
    t: "OWASP's logging guidance lists sensitive data that shouldn't be logged, or should be masked.",
    p: "Write down what happened, not people's secrets.",
    refs: ["https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html"]
  },
  {
    id: "q-0449",
    s: "Debugging", d: 3, level: "Administrator", stage: 3,
    q: "How do you follow one request through the CDN, web server, PHP and an external API in your logs?",
    o: [
      "Use one huge log file",
      "You can't",
      "Pass a shared trace or request ID (for example the W3C traceparent header) and log it everywhere",
      "Compare timestamps by eye"
    ],
    a: 2,
    t: "Trace context propagation ties log lines from different systems to the same request.",
    p: "Give the request a ticket number that every desk writes down.",
    refs: ["https://www.w3.org/TR/trace-context/"]
  },
  {
    id: "q-0450",
    s: "Change Management", d: 3, level: "Administrator", stage: 3,
    q: "What makes a postmortem actually improve reliability?",
    o: [
      "Naming who caused the incident",
      "Concrete action items with owners and due dates that are tracked to completion",
      "Closing the ticket quickly",
      "A long document nobody reads"
    ],
    a: 1,
    t: "Google's SRE guidance stresses follow-up actions; without them the same incident tends to recur.",
    p: "Decide who fixes what, by when, and check it gets done.",
    refs: ["https://sre.google/sre-book/postmortem-culture/"]
  }
];
