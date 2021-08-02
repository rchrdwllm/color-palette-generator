import { createStore } from "redux";
import { Provider } from "react-redux";
import { allReducers } from "./reducers";
import GlobalStyles from "./styles/globalStyles";
import TopBar from "./components/TopBar";
import Colors from "./components/Colors";

const store = createStore(allReducers);

const App = () => {
    return (
        <Provider store={store}>
            <GlobalStyles />
            <TopBar />
            <Colors />
        </Provider>
    );
};

export default App;
