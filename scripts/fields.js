function acf_field(fieldName, typeOfField, returnType) {
	switch (typeOfField) {
		case "range":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		case "text":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		case "textarea":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		case "button_group":
			var fieldCode = "<?php if ( get_field('" + fieldName + "') == 'value' ) : ?>\n" + " \n" + "<?php endif; ?>";
			break;

		case "check_box":
			var fieldCode = "<?php if ( get_field('" + fieldName + "') == 'value' ) : ?>\n" + " \n" + "<?php endif; ?>";
			break;

		case "radio_button":
			var fieldCode = "<?php if ( get_field('" + fieldName + "') == 'value' ) : ?>\n" + " \n" + "<?php endif; ?>";
			break;

		case "select":
			var fieldCode = "<?php if ( get_field('" + fieldName + "') == 'value' ) : ?>\n" + " \n" + "<?php endif; ?>";
			break;

		case "true_false":
			var fieldCode = "<?php if ( get_field('" + fieldName + "') ) : ?>\n" + " \n" + "<?php else: ?>\n" + " \n" + "<?php endif; ?>";
			break;

		case "file":
			switch (returnType) {
				case "array":
					var fieldCode = "<?php\n" + "$file = get_field('" + fieldName + "');\n" + "if ($file): ?>;\n" + "    <a href='<? php echo $file['url']; ?>'><?php echo $file['filename']; ?></a>\n" + "<?php endif; ?>";
					break;
				case "url":
					var fieldCode = "<?php if( get_field('file') ): ?>\n" + "    <a href='<?php the_field('" + fieldName + "'); ?>'>Download File</a>\n" + "<?php endif; ?>\n";
					break;
				case "id":
					var fieldCode = "<?php\n" + "$file = get_field('" + fieldName + "');\n" + "if( $file ):\n" + "    $url = wp_get_attachment_url( $file ); ?>\n" + "    <a href='<? php echo esc_html($url); ?>'>Download File</a>\n" + "<?php endif; ?>";
					break;
				default:
					fieldError();
			}

			break;

		case "gallery":
			switch (returnType) {
				case "array":
					var fieldCode = "<?php\n" + "$images = get_field('" + fieldName + "');\n" + "if( $images ): ?>\n" + "    <?php foreach( $images as $image ): ?>\n" + "        <a href='<? php echo esc_url($image['url']); ?>'>\n" + "            <img src='<? php echo esc_url($image['sizes']['thumbnail']); ?>' alt='<? php echo esc_attr($image['alt']); ?>'/>\n" + "        </a>\n" + "    <?php endforeach; ?>\n" + "<?php endif; ?>";
					break;
				case "url":
					var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
					break;
				case "id":
					var fieldCode = "<?php\n" + "$images = get_field('" + fieldName + "');\n" + "$size = 'full';\n" + "if( $images ): ?>\n" + "    <?php foreach( $images as $image_id ): ?>\n" + "        <?php echo wp_get_attachment_image( $image_id, $size ); ?>\n" + "    <?php endforeach; ?>\n" + "<?php endif; ?>";
					break;
				default:
					fieldError();
			}
			break;

		case "image":
			switch (returnType) {
				case "array":
					var fieldCode = "<?php\n" + "$image = get_field('" + fieldName + "');\n" + "if( !empty( $image ) ): ?>\n" + "    <img src='<?php echo esc_url($image['url']); ?>' alt='<?php echo esc_attr($image['alt']); ?>' />\n" + "<?php endif; ?>";
					break;
				case "url":
					var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
					break;
				case "id":
					var fieldCode = "<?php\n" + "$image = get_field('" + fieldName + "');\n" + "$size = 'full';\n" + "if( $image ) {\n" + "    $url = wp_get_attachment_url( $image ); ?>\n" + "    echo wp_get_attachment_image( $image, $size );\n" + "}";
					break;
				default:
					fieldError();
			}
			break;

		case "oembed":
			var fieldCode = "<div class='embed-container'>\n" + "    <?php the_field('" + fieldName + "'); ?>\n" + "</div>";
			break;

		case "wysiwyg_editor":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		case "color_picker":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		case "date_picker":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		case "date_time_picker":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		case "google_map":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			alert('This field type requires more configuration.\nRead documentation at:\nhttps://www.advancedcustomfields.com/resources/google-map/');
			window.open("https://www.advancedcustomfields.com/resources/google-map/", "_blank");
			break;

		case "time_picker":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		case "flexible_content":
			var fieldCode = "<?php\n" + "$flexibleContentPath = dirname(__FILE__) . '/flexible-content/';\n" + "if(have_rows('" + fieldName + "')) :\n" + "    while (have_rows('" + fieldName + "') ) : the_row();\n" + "        $layout = get_row_layout();\n" + "        $file = ($flexibleContentPath . str_replace('_', '-', $layout) . '.php');\n" + "        if (file_exists($file)) {\n" + "            include($file);\n" + "        }\n" + "    endwhile;\n" + "endif; ?>";
			break;

		case "group":
			var fieldCode = "<?php\n" + "if( have_rows('"+ fieldName +"') ):\n" + "    while( have_rows('"+ fieldName +"') ): the_row();\n" + "        \n" + "    endwhile;\n" + "endif; ?>";
			break;

		case "clone":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		case "repeater":
			var fieldCode = "<?php\n" + "if( have_rows('"+ fieldName +"') ):\n" + "    while( have_rows('"+ fieldName +"') ): the_row();\n" + "        \n" + "    endwhile;\n" + "endif; ?>";
			break;

		case "link":
			switch (returnType) {
				case "array":
					var fieldCode = "<?php\n" + "$link = get_field('" + fieldName + "');\n" + "if( $link ):\n" + "    $link_url = $link['url'];\n" + "    $link_title = $link['title'];\n" + "    $link_target = $link['target'] ? $link['target'] : '_self';\n" + "    ?>\n" + "    <a class='button' href='<?php echo esc_url( $link_url ); ?>' target='<?php echo esc_attr( $link_target ); ?>'><?php echo esc_html( $link_title ); ?></a>\n" + "<?php endif; ?>";
					break;
				case "url":
					var fieldCode = "<?php\n" + "$link = get_field('" + fieldName + "');\n" + "if( $link ):\n" + "    <a class='button' href='<?php echo esc_url( $link ); ?>'>Continue Reading</a>\n" + "<?php endif; ?>";
					break;
				default:
					fieldError();
			}
			break;

		case "taxonomy":
			switch (returnType) {
				case "object":
					var fieldCode = "<?php\n" + "$terms = get_field('" + fieldName + "');\n" + "if( $terms ): ?>\n" + "    <?php foreach( $terms as $term ): ?>\n" + "        \n" + "    <?php endforeach; ?>\n" + "<?php endif; ?>";
					break;
				case "id":
					var fieldCode = "<?php get_field('" + fieldName + "'); ?>";
					break;
				default:
					fieldError();
			}
			break;

		case "user":
			switch (returnType) {
				case "array":
					var fieldCode = "<?php\n" + "$user = get_field('" + fieldName + "');\n" + "if( $user ): ?>\n" + "\n" + "<?php endif; ?>";
					break;
				case "object":
					var fieldCode = "<?php\n" + "$users = get_field('" + fieldName + "');\n" + "if( $users ): ?>\n" + "    <?php foreach( $users as $user ): ?>\n" + "        \n" + "    <?php endforeach; ?>\n" + "<?php endif; ?>";
					break;
				case "id":
					var fieldCode = "<?php get_field('" + fieldName + "'); ?>";
					break;
				default:
					fieldError();
			}
			break;

		case "post_object":
			var fieldCode = "<?php\n" + "$post_object = get_field('" + fieldName + "');\n" + "if( $post_object ):\n" + "    $post = $post_object;\n" + "    setup_postdata( $post ); \n" + "    ?>\n" + "        \n" + "    <?php wp_reset_postdata(); ?>\n" + "<?php endif; ?>";
			break;

		case "relationship":
			var fieldCode = "<?php\n" + "$posts = get_field('"+ fieldName +"');\n" + "if( $posts ): ?>\n" + "    <?php foreach( $posts as $post): ?>\n" + "        <?php setup_postdata($post); ?>\n" + "        \n" + "    <?php endforeach; ?>\n" + "    <?php wp_reset_postdata(); ?>\n" + "<?php endif; ?>";
			break;

		default:
			fieldError()

	}
	if (typeof typeOfField != "undefined") {
		copyCodeToClipboard(fieldCode);
	}
}
