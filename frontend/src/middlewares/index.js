export const renameChannel = (store) => (next) => (action) => {
  if (action.type !== 'channels/renameChannel') {
    return next(action);
  }
  
  const { id } = action.payload;
  const { channels } = store.getState();
  const { channelsData } = channels;
  
  const payload = channelsData.map((channel) => {
    if (channel.id === id) {
      channel = action.payload;
      return channel;
    }
    return channel;
  });
  return next({ type:'channels/renameChannel', payload });
};

export const removeChannel = (store) => (next) => (action) => {
  if (action.type !== 'channels/removeChannel') {
    return next(action);
  }
  const { channels } = store.getState();
  const { channelsData, currentChannelId } = channels;
  const { id } = action.payload;
  
  const payload = {
    id: id,
    channelsData: channelsData.filter((channel) => channel.id !== id),
    currentChannelId: (currentChannelId !== id) ? currentChannelId : 1,
  };
  
  return next({ type:'channels/removeChannel', payload });
};
