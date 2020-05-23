function acf_field(appendCode, fieldName, typeOfField, returnType, seniority, place, subFields, ifStatement, ifStatementAllow, s) {
	switch (typeOfField) {
		// Basic
		case "text":
			var fieldCode = "<?php echo esc_html( $" + fieldName + " ); ?>";
			break;

		case "textarea":
			var fieldCode = "<?php echo $" + fieldName + "; ?>";
			break;

		case "number":
			var fieldCode = "<?php echo $" + fieldName + "; ?>";
			break;

		case "range":
			var fieldCode = "<?php echo $" + fieldName + "; ?>";
			break;

		case "email":
			var fieldCode = "<?php if ( $" + fieldName + " = get_field( '" + fieldName + "' ) ) : ?>\n" + s+"<a href=\"mailto:<?php echo $" + fieldName + "; ?>\"><?php echo $" + fieldName + "; ?></a>\n" + "<?php endif; ?>";
			break;

		case "url":
			var fieldCode = "<?php echo esc_url( $" + fieldName + " ); ?>";
			break;

		case "password":
			var fieldCode = "<?php echo esc_html( $" + fieldName + " ); ?>";
			break;

		//  Content
		case "image":
			switch (returnType) {
				case "array":
					var fieldCode = "<?php\n" + "$" + fieldName + " = get_field( '" + fieldName + "' );\n" + "if ( $" + fieldName + " ) : ?>\n" + s+"<img src=\"<?php echo esc_url( $" + fieldName + "['url'] ); ?>\" alt=\"<?php echo esc_attr( $" + fieldName + "['alt'] ); ?>\" />\n" + "<?php endif; ?>";
					break;
				case "url":
					var fieldCode = "<?php echo esc_url( get_field( '" + fieldName + "' ) ); ?>";
					break;
				case "id":
					var fieldCode = "<?php\n" + "$" + fieldName + " = get_field( '" + fieldName + "' );\n" + "$size = 'full';\n" + "if ( $" + fieldName + " ) {\n" + s+"$url = wp_get_attachment_url( $" + fieldName + " );\n" + s+"echo wp_get_attachment_image( $" + fieldName + ", $size );\n" + "}; ?>";
					break;
				default:
					fieldError();
			}
			break;

		case "file":
			switch (returnType) {
				case "array":
					var fieldCode = "<?php\n" + "$" + fieldName + " = get_field( '" + fieldName + "' );\n" + "if ( $" + fieldName + " ) : ?>\n" + s+"<a href=\"<?php echo esc_url( $" + fieldName + "['url'] ); ?>\"><?php echo esc_html( $" + fieldName + "['filename'] ); ?></a>\n" + "<?php endif; ?>";
					break;
				case "url":
					var fieldCode = "<?php if ( $" + fieldName + " = get_field( '" + fieldName + "' ) ) : ?>\n" + s+"<a href=\"<?php esc_url( $" + fieldName + " ); ?>\">Download File</a>\n" + "<?php endif; ?>\n";
					break;
				case "id":
					var fieldCode = "<?php\n" + "$" + fieldName + " = get_field( '" + fieldName + "' );\n" + "if ( $" + fieldName + " ) :\n" + s+"$url = wp_get_attachment_url( $" + fieldName + " ); ?>\n" + s+"<a href=\"<?php echo esc_html( $url ); ?>\">Download File</a>\n" + "<?php endif; ?>";
					break;
				default:
					fieldError();
			}
			break;

		case "wysiwyg":
			var fieldCode = "<?php echo $" + fieldName + "; ?>";
			break;

		case "oembed":
			var fieldCode = "<div class=\"embed-container\">\n" + s+"<?php the_field( '" + fieldName + "' ); ?>\n" + "</div>";
			break;

		case "gallery":
			switch (returnType) {
				case "array":
					var fieldCode = "<?php\n" + "$" + fieldName + " = get_field( '" + fieldName + "' );\n" + "if ( $" + fieldName + " ) : ?>\n" + s+"<?php foreach( $" + fieldName + " as $image ) : ?>\n" + s+s+"<a href=\"<?php echo esc_url( $image['url'] ); ?>\">\n" + s+s+s+"<img src=\"<?php echo esc_url( $image['sizes']['thumbnail'] ); ?>\" alt=\"<?php echo esc_attr( $image['alt'] ); ?>\"/>\n" + s+s+"</a>\n" + s+"<?php endforeach; ?>\n" + "<?php endif; ?>";
					break;
				case "url":
					var fieldCode = "<?php echo esc_url( get_field( '" + fieldName + "' ) ); ?>";
					break;
				case "id":
					var fieldCode = "<?php\n" + "$" + fieldName + " = get_field( '" + fieldName + "' );\n" + "$size = 'full';\n" + "if ( $" + fieldName + " ) : ?>\n" + s+"<?php foreach( $" + fieldName + " as $image_id ) : ?>\n" + s+s+"<?php echo wp_get_attachment_image( $image_id, $size ); ?>\n" + s+"<?php endforeach; ?>\n" + "<?php endif; ?>";
					break;
				default:
					fieldError();
			}
			break;

		// Choice
		case "select":
			var fieldCode = "<?php if ( get_field( '" + fieldName + "' ) == 1 ) : ?>\n" + " \n" + "<?php endif; ?>";
			break;

		case "checkbox":
			var fieldCode = "<?php if ( get_field( '" + fieldName + "' ) == 1 ) : ?>\n" + " \n" + "<?php endif; ?>";
			break;

		case "radio":
			var fieldCode = "<?php if ( get_field( '" + fieldName + "' ) == 1 ) : ?>\n" + " \n" + "<?php endif; ?>";
			break;

		case "button_group":
			var fieldCode = "<?php if ( get_field( '" + fieldName + "' ) == 1 ) : ?>\n" + " \n" + "<?php endif; ?>";
			break;

		case "true_false":
			var fieldCode = "<?php if ( get_field( '" + fieldName + "' ) ) : ?>\n" + " \n" + "<?php else: ?>\n" + " \n" + "<?php endif; ?>";
			break;

		// Relational
		case "link":
			switch (returnType) {
				case "array":
					var fieldCode = "<?php\n" + "$link = get_field( '" + fieldName + "' );\n" + "if ( $link ) :\n" + s+"$link_url = $link['url'];\n" + s+"$link_title = $link['title'];\n" + s+"$link_target = $link['target'] ? $link['target'] : '_self';\n" + s+"?>\n" + s+"<a class=\"button\" href=\"<?php echo esc_url( $link_url ); ?>\" target=\"<?php echo esc_attr( $link_target ); ?>\"><?php echo esc_html( $link_title ); ?></a>\n" + "<?php endif; ?>";
					break;
				case "url":
					var fieldCode = "<?php\n" + "$link = get_field( '" + fieldName + "' );\n" + "if ( $link ) : ?>\n" + s+"<a class=\"button\" href=\"<?php echo esc_url( $link ); ?>\">Continue Reading</a>\n" + "<?php endif; ?>";
					break;
				default:
					fieldError();
			}
			break;

		case "post_object":
			switch (returnType) {
				case "object":
					var fieldCode = "<?php\n" + "$" + fieldName + " = get_field( '" + fieldName + "' );\n" + "if ( $" + fieldName + " ) :\n" + s+"$post = $" + fieldName + ";\n" + s+"setup_postdata( $post ); \n" + s+"?>\n" + s+"<a href=\"<?php the_permalink(); ?>\"><?php the_title(); ?></a>\n" + s+"<?php wp_reset_postdata(); ?>\n" + "<?php endif; ?>";
					break;
				case "id":
					var fieldCode = "<?php\n" + "$" + fieldName + " = get_field( '" + fieldName + "' );\n" + "if ( $" + fieldName + " ) : ?>\n" + s+"<a href=\"<?php echo get_permalink( $" + fieldName + " ); ?>\"><?php echo get_the_title( $" + fieldName + " ); ?></a>\n" + "<?php endif; ?>";
					break;
				default:
					fieldError();
			}
			break;

		case "page_link":
			var fieldCode = "<?php\n" + "$urls = get_field( '" + fieldName + "' );\n" + "if ( $urls ) : ?>\n" + s+"<?php foreach( $urls as $url ) : ?>\n" + s+s+"<a href=\"<?php echo esc_url( $url ); ?>\" ><?php echo esc_html( $url ); ?></a>\n" + s+"<?php endforeach; ?>\n" + "<?php endif; ?>";
			break;

		case "relationship":
			var fieldCode = "<?php\n" + "$posts = get_field( '" + fieldName + "' );\n" + "if ( $posts ) : ?>\n" + s+"<?php foreach( $posts as $post) : ?>\n" + s+s+"<?php setup_postdata( $post ); ?>\n" + s+s+"\n" + s+"<?php endforeach; ?>\n" + s+"<?php wp_reset_postdata(); ?>\n" + "<?php endif; ?>";
			break;

		case "taxonomy":
			switch (returnType) {
				case "object":
					var fieldCode = "<?php\n" + "$" + fieldName + " = get_field( '" + fieldName + "' );\n" + "if ( $" + fieldName + " ) : ?>\n" + s+"<?php foreach( $" + fieldName + " as $term ) : ?>\n" + s+s+"<a href=\"<?php echo esc_url( get_term_link( $term ) ); ?>\"><?php echo esc_html( $term->name ); ?></a>\n" + s+"<?php endforeach; ?>\n" + "<?php endif; ?>";
					break;
				case "id":
					var fieldCode = "<?php\n" + "$" + fieldName + " = get_field( '" + fieldName + "' );\n" + "<?php if ( $" + fieldName + " ) : ?>\n" + s+"<?php $get_terms_args = array(\n" + s+s+"'taxonomy' => 'category',\n" + s+s+"'hide_empty' => 0,\n" + s+s+"'include' => $taxonomy_id,\n" + s+"); ?>\n" + s+"<?php $terms = get_terms( $get_terms_args ); ?>\n" + s+"<?php if ( $terms ) : ?>\n" + s+s+"<?php foreach ( $terms as $term ) : ?>\n" + s+s+s+"<a href=\"<?php echo esc_url( get_term_link( $term ) ); ?>\"><?php echo esc_html( $term->name ); ?></a>\n" + s+s+"<?php endforeach; ?>\n" + s+"<?php endif; ?>\n" + "<?php endif; ?>";
					break;
				default:
					fieldError();
			}
			break;

		case "user":
			switch (returnType) {
				case "array":
					var fieldCode = "<?php\n" + "$" + fieldName + " = get_field( '" + fieldName + "' );\n" + "if ( $" + fieldName + " ) : ?>\n" + s+"<a href=\"<?php echo get_author_posts_url( $" + fieldName + "['ID'] ); ?>\"><?php echo esc_html( $" + fieldName + "['display_name'] ); ?></a>\n" + "<?php endif; ?>";
					break;
				case "object":
					var fieldCode = "<?php $" + fieldName + " = get_field( '" + fieldName + "' ); ?>\n" + "<?php if ( $" + fieldName + " ) : ?>\n" + s+"<a href=\"<?php echo get_author_posts_url( $" + fieldName + "->ID ); ?>\"><?php echo esc_html( $" + fieldName + "->display_name ); ?></a>\n" + "<?php endif; ?>";
					break;
				case "id":
					var fieldCode = "<?php $" + fieldName + " = get_field( '" + fieldName + "' ); ?>\n" + "<?php if ( $" + fieldName + " ) : ?>\n" + s+"<?php $user_data = get_userdata( $" + fieldName + " ); ?>\n" + s+"<?php if ( $user_data ) : ?>\n" + s+s+"<a href=\"<?php echo get_author_posts_url( $" + fieldName + " ); ?>\"><?php echo esc_html( $user_data->display_name ); ?></a>\n" + s+"<?php endif; ?>\n" + "<?php endif; ?>";
					break;
				default:
					fieldError();
			}
			break;

		//jQuery
		case "google_map":
			var fieldCode = "<?php $location = get_field( '" + fieldName + "' );\n" + "if ( !empty( $location ) ) : ?>\n" + s+"<div class=\"acf-map\">\n" + s+s+"<div class=\"marker\" data-lat=\"<?php echo $location['lat']; ?>\" data-lng=\"<?php echo $location['lng']; ?>\"></div>\n" + s+"</div>\n" + "<?php endif; ?>";
			codeModal( 'google-maps', fieldName, seniority, place);
			break;

		case "date_picker":
			var fieldCode = "<?php the_field( '" + fieldName + "' ); ?>";
			break;

		case "date_time_picker":
			var fieldCode = "<?php the_field( '" + fieldName + "' ); ?>";
			break;


		case "time_picker":
			var fieldCode = "<?php the_field( '" + fieldName + "' ); ?>";
			break;

		case "color_picker":
			var fieldCode = "<?php the_field( '" + fieldName + "' ); ?>";
			break;

		// Layout
		case "group":
			var fieldCode = "<?php if ( have_rows( '" + fieldName + "' ) ) : ?>\n" + s+"<?php while ( have_rows( '" + fieldName + "' ) ) :\n" + s+s+"the_row(); ?>\n" + s+s + subFields + "\n" + s+"<?php endwhile; ?>\n" + "<?php endif; ?>";
			break;

		case "repeater":
			var fieldCode = "<?php if ( have_rows( '" + fieldName + "' ) ) : ?>\n" + s+"<?php while ( have_rows( '" + fieldName + "' ) ) :\n" + s+s+"the_row(); ?>\n" + s+s + subFields + "\n" + s+"<?php endwhile; ?>\n" + "<?php endif; ?>";
			break;

		case "flexible_content":
			var fieldCode = "<?php\n" + "$flexibleContentPath = dirname(__FILE__) . '/flexible-content/';\n" + "if ( have_rows( '" + fieldName + "' ) ) :\n" + s+"while ( have_rows( '" + fieldName + "' ) ) :\n" + s+s+"the_row();\n" + s+s+"$layout = get_row_layout();\n" + s+s+"$file = ( $flexibleContentPath . str_replace( '_', '-', $layout) . '.php' );\n" + s+s+"if ( file_exists( $file ) ) {\n" + s+s+s+"include( $file );\n" + s+s+"}\n" + s+"endwhile;\n" + "endif; ?>";
			break;

		case "clone":
			var fieldCode = "<?php the_field( '" + fieldName + "' ); ?>";
			break;

		default:
			var fieldCode = "<?php the_field( '" + fieldName + "' ); ?>";
			fieldError();
	}

	if (ifStatement && ifStatementAllow) {
		var phpif = "<?php if ( $" + fieldName + " = get_field( '" + fieldName + "' ) ) : ?>\n" + s+"";
		var phpendif = "\n<?php endif; ?>";
		fieldCode = phpif + fieldCode + phpendif;
	} else if (ifStatementAllow) {
		// Replace php variable with get_field instead
		fieldCode = fieldCode.replace("$"+fieldName, "get_field( '"+fieldName+"' )");
	}

	// Change to sub field if sub field
	if (seniority == 'sub' ) {
		fieldCode = fieldCode.replace( 'get_field', 'get_sub_field' );
		fieldCode = fieldCode.replace( 'the_field', 'the_sub_field' );
	}
	// Add options if options page
	if (place == 'options_page' ) {
		var fieldNameRe = new RegExp("'" + fieldName + "'", 'g' );
		fieldCode = fieldCode.replace(fieldNameRe, "'" + fieldName + "', 'options'");
	}

	// Adjust tabs for appended sub fields
	if (appendCode) {
		fieldCode = fieldCode.replace(/\n/g, '\n\t\t' )
	}
		
	// Copy to clipboard
	sessionStorage.removeItem( 'fieldcode' );
	sessionStorage.setItem( 'fieldcode', '\n\t\t' + fieldCode + '\n' );
	// Copy the code to the clipboard if sub fields are done appending to a repeater or group field
	// Skip running copy code funtion if the field type is google_map
	if (!appendCode && typeOfField !== 'google_map' ) {
		copyCodeToClipboard(fieldCode, subFields);

		// Clear session storage
		sessionStorage.removeItem("fieldcode");
	}
}