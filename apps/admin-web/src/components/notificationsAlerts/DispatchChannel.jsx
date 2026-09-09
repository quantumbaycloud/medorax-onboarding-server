import React from "react";
import DispatchChannel from "./DispatchChannel";

const DispatchChannels = ({
  channels = [],
  channelStates = {},
  onToggle,
}) => {
  const safeChannels = Array.isArray(channels) ? channels : [];
  const safeChannelStates = channelStates || {};

  return (
    <div className="divide-y divide-slate-100">
      {safeChannels.map((channel) => {
        if (!channel?.id) {
          return null;
        }

        return (
          <DispatchChannel
            key={channel.id}
            channel={channel}
            state={safeChannelStates[channel.id] ?? {}}
            onToggle={onToggle}
          />
        );
      })}
    </div>
  );
};

export default DispatchChannels;