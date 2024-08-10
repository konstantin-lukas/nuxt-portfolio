export interface Project {
    name: string;
    title: string;
    year: number;
    context: string;
    type: string;
    about: string;
    links: {
        text: string;
        url: string;
    }[];
}
