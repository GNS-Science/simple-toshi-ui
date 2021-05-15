import TestRenderer from 'react-test-renderer';
import {createMockEnvironment, MockPayloadGenerator} from "relay-test-utils";
import AppStrongMotionStationQuery from './__generated__/AppStrongMotionStationQuery.graphql';
import AppRoot from './App';

/*
 * 
 * https://relay.dev/docs/guides/testing-relay-components/
 *
 * https://medium.com/dooboolab/testing-relay-hook-with-react-testing-library-d432f903b8d2
 * 
*/

describe('AppRoot component', () => {

it('displays `Loading...` while waiting for data', () => {
	const environment = createMockEnvironment();
  	const testRenderer = TestRenderer.create(
        <AppRoot environment={environment} />
     );
  	//expect(testRenderer.toJSON()).toContain('Loading OK...')
  	expect(testRenderer).toMatchSnapshot() //contains ProgressCircle
})

it('displays a StrongMotionStaton using mock graphql payload', () => {

	// //lets us mock out the graphql service (amongst other things)
	const environment = createMockEnvironment();

	//this defines the data we want our query to return
	const mockResolver = {
			StrongMotionStaton: (): any => ({
				id: 'id',
				site_code: 'site_code',
				site_class: 'A',
				created: '2020-10-10T23:00:00+00:00',
				soft_clay_or_peat: false,
				Vs30_mean: [23]
			}),
	};
 
 	//create a query operation
	environment.mock.queuePendingOperation(AppStrongMotionStationQuery, {A:1})

	//queu up the response we want returned
	environment.mock.queueOperationResolver(
  		(operation) => MockPayloadGenerator.generate(operation, mockResolver),
	);
	
	//create the test subject
  	const testRenderer = TestRenderer.create(
        <AppRoot environment={environment} />
     );


  	/*
  	 * this may be useful later ....
  	 */
	  // 	TestRenderer.act(() => {
	  // 		jest.useFakeTimers();
	  // 		// console.log("all ops:", environment.mock.getAllOperations());
	  //        // trigger the loading - click a button, emit an event, etc. or .
	  // 		jest.runAllImmediates();
	  //        console.log(environment.mock.getMostRecentOperation());
	  //        console.log(testRenderer.toJSON());
      // 	});

  	// assertions
    expect(testRenderer).toBeTruthy()
    expect(testRenderer).toMatchSnapshot() //will fail if our response is changed
  })
})