CREATE TYPE packaging AS ENUM (
	'all_compostable',
	'plastic',
	'stryofoam'
);

CREATE TABLE organizations (
	organiztion_id              int  PRIMARY KEY
		GENERATED BY DEFAULT AS IDENTITY,
	organization_name           text,
	has_plastic_straw           bool,
	has_single_serve_condiments bool,
	packaging                   packaging,
	geog                        public.geography
);