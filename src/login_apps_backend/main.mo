import Principal "mo:base/Principal";
actor {
  public shared query (msg) func idprincipal() : async Text {
    let caller = msg.caller; //we need to change the caller value
    Principal.toText(caller);
  };
};
