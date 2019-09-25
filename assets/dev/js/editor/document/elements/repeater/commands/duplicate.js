import Base from '../../../commands/base';

// Duplicate
export default class extends Base {
	validateArgs( args ) {
		this.requireContainer( args );

		this.requireArgumentType( 'name', 'string', args );
		this.requireArgumentType( 'index', 'number', args );
	}

	getHistory( args ) {
		const { containers = [ args.container ] } = args;

		return {
			containers,
			type: 'duplicate',
			subTitle: elementor.translate( 'Item' ),
		};
	}

	apply( args ) {
		const { index, name, options = {}, containers = [ args.container ] } = args,
			result = [];

		containers.forEach( ( container ) => {
			const settingsModel = container.settings,
				controlName = container.model.get( 'widgetType' ),
				collection = settingsModel.get( name ),
				item = collection.at( index );

			result.push( $e.run( 'document/elements/repeater/insert', {
				container,
				name,
				model: item.toJSON(),
				options: Object.assign( {
					at: index + 1,
				}, options ),
			} ) );
		} );

		if ( 1 === result.length ) {
			return result[ 0 ];
		}

		return result;
	}
}
