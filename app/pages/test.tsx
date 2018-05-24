import React from "react";
import * as next from "next";
import fetch from "isomorphic-fetch";
import { Link } from "../routes";

interface Props {
  str: string;
}

export default class Test extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  static async getInitialProps({ query }: next.NextContext): Promise<Props> {
    const fetchRes = await fetch("http://localhost:3000/_/foo");
    return { str: query.str + (await fetchRes.text()) };
  }

  render() {
    return (
      <div>
        <h1>test: {this.props.str}</h1>
        <Link route="/about" prefetch><a>Go to about page</a></Link>
      </div>
    );
  }
}
