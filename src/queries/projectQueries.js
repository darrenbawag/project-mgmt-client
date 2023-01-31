import { gql } from "@apollo/client"

export const GET_PROJECTS = gql`
	query getProjects {
		projects {
			id
			name
			status
			clientId {
				name
			}
		}
	}
`;

export const GET_PROJECT = gql`
	query getProject($id: ID!) {
		project(id: $id) {
			id
			name
			description
			status
			clientId {
				id
				name
				email
				phone
			}
		}
	}
`;