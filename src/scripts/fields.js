function acf_field(appendCode, fieldName, typeOfField, returnType, seniority, place, subFields) {
	switch (typeOfField) {
		// Basic
		case "text":
			var fieldCode = "<?php if ( $" + fieldName + " = get_field('" + fieldName + "') ): ?>\n" + "\t<?php echo $" + fieldName + "; ?>\n" + "<?php endif; ?>";
			break;

		case "textarea":
			var fieldCode = "<?php if ( $" + fieldName + " = get_field('" + fieldName + "') ): ?>\n" + "\t<?php echo $" + fieldName + "; ?>\n" + "<?php endif; ?>";
			break;

		case "number":
			var fieldCode = "<?php if ( $" + fieldName + " = get_field('" + fieldName + "') ): ?>\n" + "\t<?php echo $" + fieldName + "; ?>\n" + "<?php endif; ?>";
			break;

		case "range":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		case "email":
			var fieldCode = "<?php if ( $" + fieldName + " = get_field('" + fieldName + "') ): ?>\n" + "\t<a href=\"mailto:<?php echo $" + fieldName + "; ?>\"><?php echo $" + fieldName + "; ?></a>\n" + "<?php endif; ?>";
			break;

		case "url":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		case "password":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		//  Content
		case "image":
			switch (returnType) {
				case "array":
					var fieldCode = "<?php\n" + "$" + fieldName + " = get_field('" + fieldName + "');\n" + "if( !empty( $" + fieldName + " ) ): ?>\n" + "\t<img src=\"<?php echo esc_url($" + fieldName + "['url']); ?>\" alt=\"<?php echo esc_attr($" + fieldName + "['alt']); ?>\" />\n" + "<?php endif; ?>";
					break;
				case "url":
					var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
					break;
				case "id":
					var fieldCode = "<?php\n" + "$" + fieldName + " = get_field('" + fieldName + "');\n" + "$size = 'full';\n" + "if( $" + fieldName + " ) {\n" + "\t$url = wp_get_attachment_url( $" + fieldName + " );\n" + "\techo wp_get_attachment_image( $" + fieldName + ", $size );\n" + "}; ?>";
					break;
				default:
					fieldError();
			}
			break;

		case "file":
			switch (returnType) {
				case "array":
					var fieldCode = "<?php\n" + "$file = get_field('" + fieldName + "');\n" + "if ($file): ?>;\n" + "\t<a href=\"<?php echo $file['url']; ?>\"><?php echo $file['filename']; ?></a>\n" + "<?php endif; ?>";
					break;
				case "url":
					var fieldCode = "<?php if( get_field('file') ): ?>\n" + "\t<a href=\"<?php the_field('" + fieldName + "'); ?>'>Download File</a>\n" + "<?php endif; ?>\n";
					break;
				case "id":
					var fieldCode = "<?php\n" + "$file = get_field('" + fieldName + "');\n" + "if( $file ):\n" + "\t$url = wp_get_attachment_url( $file ); ?>\n" + "\t<a href=\"<?php echo esc_html($url); ?>\">Download File</a>\n" + "<?php endif; ?>";
					break;
				default:
					fieldError();
			}
			break;

		case "wysiwyg":
			var fieldCode = "<?php if ( $" + fieldName + " = get_field('" + fieldName + "') ): ?>\n" + "\t<?php echo $" + fieldName + "; ?>\n" + "<?php endif; ?>";
			break;

		case "oembed":
			var fieldCode = "<div class=\"embed-container\">\n" + "\t<?php the_field('" + fieldName + "'); ?>\n" + "</div>";
			break;

		case "gallery":
			switch (returnType) {
				case "array":
					var fieldCode = "<?php\n" + "$images = get_field('" + fieldName + "');\n" + "if( $images ): ?>\n" + "\t<?php foreach( $images as $image ): ?>\n" + "\t\t<a href=\"<?php echo esc_url($image['url']); ?>\">\n" + "\t\t\t<img src=\"<?php echo esc_url($image['sizes']['thumbnail']); ?>\" alt=\"<?php echo esc_attr($image['alt']); ?>\"/>\n" + "\t\t</a>\n" + "\t<?php endforeach; ?>\n" + "<?php endif; ?>";
					break;
				case "url":
					var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
					break;
				case "id":
					var fieldCode = "<?php\n" + "$images = get_field('" + fieldName + "');\n" + "$size = 'full';\n" + "if( $images ): ?>\n" + "\t<?php foreach( $images as $image_id ): ?>\n" + "\t\t<?php echo wp_get_attachment_image( $image_id, $size ); ?>\n" + "\t<?php endforeach; ?>\n" + "<?php endif; ?>";
					break;
				default:
					fieldError();
			}
			break;

		// Choice
		case "select":
			var fieldCode = "<?php if ( get_field('" + fieldName + "') == 'value' ) : ?>\n" + " \n" + "<?php endif; ?>";
			break;

		case "checkbox":
			var fieldCode = "<?php if ( get_field('" + fieldName + "') == 'value' ) : ?>\n" + " \n" + "<?php endif; ?>";
			break;

		case "radio":
			var fieldCode = "<?php if ( get_field('" + fieldName + "') == 'value' ) : ?>\n" + " \n" + "<?php endif; ?>";
			break;

		case "button_group":
			var fieldCode = "<?php if ( get_field('" + fieldName + "') == 'value' ) : ?>\n" + " \n" + "<?php endif; ?>";
			break;

		case "true_false":
			var fieldCode = "<?php if ( get_field('" + fieldName + "') ) : ?>\n" + " \n" + "<?php else: ?>\n" + " \n" + "<?php endif; ?>";
			break;

		// Relational
		case "link":
			switch (returnType) {
				case "array":
					var fieldCode = "<?php\n" + "$link = get_field('" + fieldName + "');\n" + "if( $link ):\n" + "\t$link_url = $link['url'];\n" + "\t$link_title = $link['title'];\n" + "\t$link_target = $link['target'] ? $link['target'] : '_self';\n" + "\t?>\n" + "\t<a class=\"button\" href=\"<?php echo esc_url( $link_url ); ?>\" target=\"<?php echo esc_attr( $link_target ); ?>\"><?php echo esc_html( $link_title ); ?></a>\n" + "<?php endif; ?>";
					break;
				case "url":
					var fieldCode = "<?php\n" + "$link = get_field('" + fieldName + "');\n" + "if( $link ):\n" + "\t<a class=\"button\" href=\"<?php echo esc_url( $link ); ?>\">Continue Reading</a>\n" + "<?php endif; ?>";
					break;
				default:
					fieldError();
			}
			break;

		case "post_object":
			var fieldCode = "<?php\n" + "$post_object = get_field('" + fieldName + "');\n" + "if( $post_object ):\n" + "\t$post = $post_object;\n" + "\tsetup_postdata( $post ); \n" + "\t?>\n" + "\t\t\n" + "\t<?php wp_reset_postdata(); ?>\n" + "<?php endif; ?>";
			break;

		case "page_link":
			var fieldCode = "<?php\n" + "$urls = get_field('" + fieldName + "');\n" + "if( $urls ): ?>\n" + "\t<?php foreach( $urls as $url ): ?>\n" + "\t\t<a href=\"<?php echo esc_url($url); ?>\" ><?php echo esc_html( $url ); ?></a>\n" + "\t<?php endforeach; ?>\n" + "<?php endif; ?>";
			break;

		case "relationship":
			var fieldCode = "<?php\n" + "$posts = get_field('" + fieldName + "');\n" + "if( $posts ): ?>\n" + "\t<?php foreach( $posts as $post): ?>\n" + "\t\t<?php setup_postdata($post); ?>\n" + "\t\t\n" + "\t<?php endforeach; ?>\n" + "\t<?php wp_reset_postdata(); ?>\n" + "<?php endif; ?>";
			break;

		case "taxonomy":
			switch (returnType) {
				case "object":
					var fieldCode = "<?php\n" + "$terms = get_field('" + fieldName + "');\n" + "if( $terms ): ?>\n" + "\t<?php foreach( $terms as $term ): ?>\n" + "\t\t\n" + "\t<?php endforeach; ?>\n" + "<?php endif; ?>";
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
					var fieldCode = "<?php\n" + "$users = get_field('" + fieldName + "');\n" + "if( $users ): ?>\n" + "\t<?php foreach( $users as $user ): ?>\n" + "\t\t\n" + "\t<?php endforeach; ?>\n" + "<?php endif; ?>";
					break;
				case "id":
					var fieldCode = "<?php get_field('" + fieldName + "'); ?>";
					break;
				default:
					fieldError();
			}
			break;

		//jQuery
		case "google_map":
			var fieldCode = "<?php $location = get_field('" + fieldName + "');\n" + "if( !empty($location) ): ?>\n" + "\t<div class=\"acf-map\">\n" + "\t\t<div class=\"marker\" data-lat=\"<?php echo $location['lat']; ?>\" data-lng=\"<?php echo $location['lng']; ?>\"></div>\n" + "\t</div>\n" + "<?php endif; ?>";
			codeModal('google-maps', fieldName, seniority, place);
			break;

		case "date_picker":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		case "date_time_picker":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;


		case "time_picker":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		case "color_picker":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		// Layout
		case "group":
			var fieldCode = "<?php if( have_rows('" + fieldName + "') ): ?>\n" + "\t<?php while( have_rows('" + fieldName + "') ): the_row(); ?>\n" + "\t\t" + subFields + "\n" + "\t<?php endwhile; ?>\n" + "<?php endif; ?>";
			break;

		case "repeater":
			var fieldCode = "<?php if( have_rows('" + fieldName + "') ): ?>\n" + "\t<?php while( have_rows('" + fieldName + "') ): the_row(); ?>\n" + "\t\t" + subFields + "\n" + "\t<?php endwhile; ?>\n" + "<?php endif; ?>";
			break;

		case "flexible_content":
			var fieldCode = "<?php\n" + "$flexibleContentPath = dirname(__FILE__) . '/flexible-content/';\n" + "if(have_rows('" + fieldName + "')) :\n" + "\twhile (have_rows('" + fieldName + "') ) : the_row();\n" + "\t\t$layout = get_row_layout();\n" + "\t\t$file = ($flexibleContentPath . str_replace('_', '-', $layout) . '.php');\n" + "\t\tif (file_exists($file)) {\n" + "\t\t\tinclude($file);\n" + "\t\t}\n" + "\tendwhile;\n" + "endif; ?>";
			break;

		case "clone":
			var fieldCode = "<?php the_field('" + fieldName + "'); ?>";
			break;

		default:
			fieldError();
	}

	// Change to sub field if sub field
	if (seniority == 'sub') {
		fieldCode = fieldCode.replace('get_field', 'get_sub_field');
		fieldCode = fieldCode.replace('the_field', 'the_sub_field');
	}
	// Add options if options page
	if (place == 'options_page') {
		var fieldNameRe = new RegExp("'" + fieldName + "'", 'g');
		fieldCode = fieldCode.replace(fieldNameRe, "'" + fieldName + "', 'options'");
	}

	// Adjust tabs for appended sub fields
	if(appendCode) {
		fieldCode = fieldCode.replace(/\n/g, '\n\t\t')
	}
		
	// Copy to clipboard
	sessionStorage.removeItem('fieldcode');
	sessionStorage.setItem('fieldcode', '\n\t\t' + fieldCode + '\n');
	// Copy the code to the clipboard if sub fields are done appending to a repeater or group field
	// Skip running copy code funtion if the field type is google_map
	if(!appendCode && typeOfField !== 'google_map') {
		copyCodeToClipboard(fieldCode, subFields);
	}
}