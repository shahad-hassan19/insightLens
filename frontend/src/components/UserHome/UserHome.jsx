export default function UserHome() {
    return (
        <div id="user-home" className="flex flex-col justify-between">
            <div>
                <h3 className="text-3xl font-bold text-left m-6">
                    What is Data Visualization?
                </h3>
            </div>
            <div className="ml-5 p-5 flex flex-col items-center font-normal">
                <p className="mb-3">
                    Data visualization is the{" "}
                    <span className="font-medium">
                        graphical representation of data and information
                    </span>
                    . It involves transforming complex datasets into visual forms such
                    as charts, graphs, maps, and dashboards, making it easier to
                    understand, analyze, and communicate insights. Through
                    visualizations, patterns, trends, and relationships within data can
                    be identified more effectively than through raw numbers alone.
                </p>
                <p className="mb-3">
                    The primary goal of data visualization is to convey information
                    clearly and efficiently to users, enabling them to make data-driven
                    decisions. It facilitates the exploration of data, allowing users to
                    uncover hidden insights, outliers, and correlations that may not be
                    immediately apparent from the raw data. Moreover, data visualization
                    enhances storytelling by providing a compelling narrative backed by
                    visual evidence.
                </p>
                <p className="mb-3">
                    Effective data visualization requires careful consideration of
                    factors such as the choice of visualization type, color schemes,
                    labeling, and interactivity. It should be tailored to the audience`s
                    needs and preferences, ensuring that the message is conveyed
                    accurately and intuitively.
                </p>
                <p>
                    In today`s data-driven world, data visualization plays a crucial
                    role across various domains, including business, science, finance,
                    healthcare, and academia. It empowers organizations and individuals
                    to derive actionable insights from large and complex datasets,
                    driving innovation, decision-making, and problem-solving.
                </p>
            </div>
        </div>
    );
}
