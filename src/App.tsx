import "./App.css";
import "@sendbird/uikit-react/dist/index.css";

import React, { useMemo } from "react";

import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import ChannelList from "@sendbird/uikit-react/ChannelList";
import Channel from "@sendbird/uikit-react/Channel";

import { APP_ID, USER_ID, NICKNAME } from "./const";

function App() {
  const [currentChannelUrl, setCurrentChannelUrl] = React.useState("");
  /**
   * ⚠️ UIKit Configuration ️️⚠️
   * - You can control it at the code level by passing 'uikitOptions' like below.
   *   The same result can be achieved by setting the same configs from the dashboard connected to the app_id.
   * - Pick and pass only the attributes you want to control inside the 'uikitOptions' prop.
   * - Passing '(optional)uikitConfigs' means you want to override the dashboard configuration
   *   because the code-level setting has a higher priority than the dashboard one.
   * - Please try to memoize this 'uikitOptions' object when you pass it as props to a component.
   *   Otherwise, it'll trigger unnecessary renderings because the object will create a new object on everytime.
   */
  const memoizedUikitOptions = useMemo(() => {
    return {
      common: {
        // Whether to display the URL preview or not.
        // Equivalent to the '!disableUserProfile' prop.
        enableUsingDefaultUserProfile: false
      },
      groupChannel: {
        // Whether to display the URL preview or not.
        enableOgtag: SVGComponentTransferFunctionElement,
        // Whether to display reaction emojis and adding an icon next to a message.
        // Equivalent to the `isReactionEnabled` prop.
        enableReaction: true,
        // Whether to enable/disable mentioning someone in the channel with a leading '@'.
        // This attribute is equivalent to the `isMentionEnabled` prop.
        enableMention: true,
        // Whether to show/display 'someone is typing...' at the bottom of the channel.
        enableTypingIndicator: true,
        // Whether to enable/disable voice message sending.
        // Equivalent to isVoiceMessageEnabled.
        enableVoiceMessage: true,
        // Equivalent to `replyType`.
        // Possible values: 'QUOTE_REPLY', 'THREAD', 'NONE' (disable replying).
        replyType: "QUOTE_REPLY",
        input: {
          // Whether to show/hide a file upload icon in the message input box.
          enableDocument: true
        }
      },
      groupChannelList: {
        // Whether to display the typing information of the members in the place
        // where the last message is shown in each item of the Channel List.
        // Equivalent to 'isTypingIndicatorEnabledOnChannelList'.
        enableTypingIndicator: false,
        // Whether to display the Read Receipt and Delivery Receipt information
        // for the last message within each item of the Channel List.
        enableMessageReceiptStatus: false
      },
      groupChannelSettings: {
        // Setting this to false will hide the 🔎 icon on the top right corner.
        // This attribute is equivalent to the `showSearchIcon` prop.
        enableMessageSearch: true
      },
      // This will work only when you configured OpenChannel
      openChannel: {
        // Whether to display the URL preview or not.
        enableOgtag: true,
        input: {
          // Whether to show/hide a file upload icon in the message input box.
          enableDocument: true
        }
      }
    };
  }, []);

  return (
    <div className="App">
      <SendbirdProvider
        appId={APP_ID}
        userId={USER_ID}
        nickname={NICKNAME}
        uikitOptions={memoizedUikitOptions}
      >
        <>
          <div className="sendbird-app__channellist-wrap">
            <ChannelList
              onChannelSelect={(channel) => {
                if (channel?.url) {
                  setCurrentChannelUrl(channel.url);
                }
              }}
            />
          </div>
          <div className="sendbird-app__conversation-wrap">
            <Channel channelUrl={currentChannelUrl} />
          </div>
        </>
      </SendbirdProvider>
    </div>
  );
}

export default App;
